/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { OkPacket } from 'mysql2';
import { Database } from '../database/database';
import { CommentType } from '@ytc/shared/models/util';
import { VideoService } from './video.service';
import { YoutubeAPIService } from './youtube.service';

/**
 * Service class for managing comments.
 */
export class CommentService {
  private db: Database;
  private youtubeAPI: YoutubeAPIService;
  private videoService: VideoService;

  private readonly COMMENTS_NUMBER_LIMIT = 20;

  /**
   * Creates an instance of CommentService.
   * Initializes the database and YoutubeAPI instances.
   */
  constructor() {
    this.db = Database.getInstance();
    this.youtubeAPI = YoutubeAPIService.getInstance();
    this.videoService = new VideoService();
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

    await this.InsertCommentList(dbComments);

    return dbComments;
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

    const promises = videoIdList.map(videoId => this.GetComments(videoId, true));
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
