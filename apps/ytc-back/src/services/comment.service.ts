/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { CommentType } from '@ytc/shared/models/util';
import { OkPacket } from 'mysql2';
import { Database } from '../database/database';
import { OpenAIService } from './ai.service';
import { HuggingFaceService } from './huggingface.service';
import { VideoService } from './video.service';
import { YoutubeAPIService } from './youtube.service';

/**
 * Service class for managing comments.
 */
export class CommentService {
    private db: Database;
    private youtubeAPI: YoutubeAPIService;
    private videoService: VideoService;
    private openAIService: OpenAIService;
    private huggingFaceService: HuggingFaceService;

    private readonly COMMENTS_NUMBER_LIMIT = 100;

    /**
     * Creates an instance of CommentService.
     * Initializes the database and YoutubeAPI instances.
     */
    constructor() {
        this.db = Database.getInstance();
        this.youtubeAPI = YoutubeAPIService.getInstance();
        this.huggingFaceService = HuggingFaceService.getInstance();
        this.videoService = new VideoService();
        this.openAIService = new OpenAIService();
    }

    /** Retrieves comments from a specific date
     * @param date The date to retrieve comments from.
     * @param forceRefresh Whether to force a refresh of the comments from the YouTube API.
     * @returns A promise that resolves to an array of comments.
     */
    async GetCommentsFromDate(date: string, forceRefresh: boolean): Promise<CommentType[]> {
        const youtubeComments = await this.youtubeAPI.GetYoutubeCommentsFromDate(date, {
            maxResults: this.COMMENTS_NUMBER_LIMIT,
        });
        if (!youtubeComments?.items?.length) return [];

        const dbComments: CommentType[] = youtubeComments.items
            .map((comment, index) => ({
                id: comment.id || '',
                commenter: comment.snippet?.topLevelComment?.snippet?.authorDisplayName || '',
                comment: comment.snippet?.topLevelComment?.snippet?.textDisplay || '',
                date: comment.snippet?.topLevelComment?.snippet?.publishedAt || '',
                relevance_order: index,
                like_count: comment.snippet?.topLevelComment?.snippet?.likeCount || 0,
                reply_count: comment.snippet?.totalReplyCount || 0,
                gpt: '',
                unwanted: false,
                question: false,
                feedback: false,
                idea: false,
                collaboration: false,
                video_id: '',
            }))
            .filter(comment => comment.id !== '' && comment.commenter !== '' && comment.comment !== '');

        await this.classifyComments(dbComments, '');
        await this.InsertCommentList(dbComments);

        return dbComments;
    }

    /**
     * Retrieves comments for a specific video.
     * @param videoId The ID of the video to retrieve comments for.
     * @param forceRefresh Whether to force a refresh of the comments from the YouTube API.
     * @returns A promise that resolves to an array of comments.
     */
    async GetComments(videoId: string, forceRefresh: boolean): Promise<CommentType[]> {
        const video = await this.videoService.GetVideo(videoId);
        if (!video) return [];

        if (!forceRefresh) {
            const comments = await this.GetCommentsForVideo(videoId);
            if (comments.length > 0) return comments;
        }

        const youtubeComments = await this.youtubeAPI.GetYoutubeComments(videoId, {
            maxResults: this.COMMENTS_NUMBER_LIMIT,
        });
        if (!youtubeComments?.items?.length) return [];

        const dbComments: CommentType[] = youtubeComments.items
            .map((comment, index) => ({
                id: comment.id || '',
                commenter: comment.snippet?.topLevelComment?.snippet?.authorDisplayName || '',
                comment: comment.snippet?.topLevelComment?.snippet?.textDisplay || '',
                date: comment.snippet?.topLevelComment?.snippet?.publishedAt || '',
                relevance_order: index,
                like_count: comment.snippet?.topLevelComment?.snippet?.likeCount || 0,
                reply_count: comment.snippet?.totalReplyCount || 0,
                gpt: '',
                unwanted: false,
                question: false,
                feedback: false,
                idea: false,
                collaboration: false,
                video_id: videoId,
            }))
            .filter(comment => comment.id !== '' && comment.commenter !== '' && comment.comment !== '');

        await this.classifyComments(dbComments, video.title);
        await this.InsertCommentList(dbComments);

        return dbComments;
    }

    /**
     * Classifies all comments in the given array using HuggingFace and updates the comment objects accordingly.
     * @param comments The array of comments to classify.
     * @param videoTitle The title of the video the comments belong to.
     */
    async classifyComments(comments: CommentType[], videoTitle: string): Promise<void> {
        try {
            if (!comments || !Array.isArray(comments) || comments.length === 0) {
                throw new Error('Invalid input: comments must be a non-empty array');
            }
            if (!videoTitle || typeof videoTitle !== 'string') {
                throw new Error('Invalid input: videoTitle must be a non-empty string');
            }
            const commentClasses = await this.huggingFaceService.predictBatch(comments.map(comment => comment.comment), videoTitle);
            for (let i = 0; i < comments.length; i++) {
                const comment = comments[i];
                const commentClass = commentClasses[i];
                switch (commentClass) {
                    case this.huggingFaceService.categories[2]:
                        comment.collaboration = true;
                        break;
                    case this.huggingFaceService.categories[0]:
                        comment.question = true;
                        break;
                    case this.huggingFaceService.categories[4]:
                        comment.idea = true;
                        break;
                    case this.huggingFaceService.categories[1]:
                        comment.feedback = true;
                        break;
                    case this.huggingFaceService.categories[3]:
                        comment.unwanted = true;
                        break;
                    default:
                        throw new Error(`Invalid classification result: ${commentClass}`);
                }
            }
        } catch (error) {
            console.error(`Error classifying comments: ${error.message}`);
            throw error;
        }
    }

    /**
     * Retrieves all comments from the database.
     * @returns A promise that resolves to an array of comments.
     */
    async GetAllComments(): Promise<CommentType[]> {
        const comments = await this.db.query<CommentType[]>('SELECT * FROM comments');
        return this.MapDatabaseCommentsToComments(comments);
    }

    /**
     * Retrieves all comments for a specific video from the database.
     * @param videoId The ID of the video to retrieve comments for.
     * @returns A promise that resolves to an array of comments.
     */
    async GetCommentsForVideo(videoId: string): Promise<CommentType[]> {
        if (!videoId) return [];
        const comments = await this.db.query<CommentType[]>('SELECT * FROM comments WHERE video_id = ?', [videoId]);
        return this.MapDatabaseCommentsToComments(comments);
    }

    /**
     * Retrieves all comments for a list of videos from the database.
     * @param videoIdList The list of video IDs to retrieve comments for.
     * @returns A promise that resolves to an array of comments.
     */
    async GetCommentForVideoList(videoIdList: string[]): Promise<CommentType[]> {
        if (videoIdList.length === 0) return [];

        // TODO : find a way to smart refresh the comments when loading stats?channels on frontend
        const promises = videoIdList.map(videoId => this.GetComments(videoId, false));
        const comments = await Promise.all(promises);

        return comments.flat();
    }

    /**
     * Inserts a list of comments into the database.
     * @param commentList The list of comments to insert.
     * @returns The number of rows affected by the insert operation.
     */
    async InsertCommentList(commentList: CommentType[]): Promise<number> {
        if (commentList.length === 0) return 0;

        const columns = Object.keys(commentList[0]) as Array<keyof CommentType>;
        const sql = `INSERT IGNORE INTO comments (${columns.join(', ')}) VALUES ?`;

        const values = commentList.map(comment => columns.map(column => comment[column]));

        const result = await this.db.query<OkPacket>(sql, [values]);
        return result.affectedRows;
    }

    /**
     * Maps an array of database comments to an array of comments.
     * @param databaseComments The array of database comments to map.
     * @returns An array of comments.
     */
    private MapDatabaseCommentsToComments(databaseComments: CommentType[]): CommentType[] {
        return databaseComments.map(comment => ({
            id: comment.id,
            commenter: comment.commenter,
            comment: comment.comment,
            date: comment.date,
            relevance_order: comment.relevance_order,
            like_count: comment.like_count,
            reply_count: comment.reply_count,
            gpt: comment.gpt,
            unwanted: comment.unwanted,
            question: comment.question,
            feedback: comment.feedback,
            idea: comment.idea,
            collaboration: comment.collaboration,
            video_id: comment.video_id,
        }));
    }

    /**
     * Sorts an array of comments based on the relevance_order property.
     * @param a The first comment to compare.
     * @param b The second comment to compare.
     * @returns A number indicating the sort order.
     */
    public static SortByRelevanceOrder(a: CommentType, b: CommentType): number {
        return a.relevance_order - b.relevance_order;
    }
}
