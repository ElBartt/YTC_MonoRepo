/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Comment } from "../models/comment.model";
import { Stat } from "../types/interface";
import { ChannelService } from "./channel.service";
import { CommentService } from "./comment.service";
import { VideoService } from "./video.service";

/**
 * Service for retrieving statistics for videos and channels.
 */
export class StatService {
    private videoService: VideoService;
    private channelService: ChannelService;
    private commentService: CommentService;

    /**
     * Creates an instance of StatService and initializes the database connection.
     */
    constructor() {
        this.videoService = new VideoService();
        this.channelService = new ChannelService();
        this.commentService = new CommentService();
    }

    /**
     * Retrieves statistics for a specific video from the database.
     * @param videoId The ID of the video to retrieve statistics for.
     * @returns A promise that resolves to an object containing the stats, or undefined if the video does not exist.
     */
    async GetStatsForVideo(videoId: string): Promise<Stat | undefined> {
        const video = await this.videoService.GetVideo(videoId);
        if (!video) return undefined;

        const comments = await this.commentService.GetCommentsForVideo(videoId);
        const stats = this.CalculateStats(comments);

        return stats;
    }

    /**
     * Retrieves statistics for a specific channel from the database.
     * @param channelId The ID of the channel to retrieve statistics for.
     * @returns A promise that resolves to an object containing the stats, or undefined if the channel does not exist.
     */
    async GetStatsForChannel(channelId: string): Promise<Stat | undefined> {
        const channel = await this.channelService.GetChannel(channelId);
        if (!channel) return undefined;

        const videos = await this.videoService.GetVideosForChannel(channelId);
        const videoIds = videos.map(video => video.id);

        const comments = await this.commentService.GetCommentForVideoList(videoIds);
        const stats = this.CalculateStats(comments);

        return stats;
    }

    /**
     * Calculates statistics for a list of comments.
     * @param comments The list of comments to calculate statistics for.
     * @returns An object containing the total number of comments, spam comments, and responded comments for the video.
     */
    private CalculateStats(comments: Comment[]): Stat {
        const stats: Stat = {
            totalComments: comments.length,
            totalUnwanted: 0,
            totalQuestion: 0,
            totalFeedback: 0,
            totalIdea: 0,
            totalCollaboration: 0
        };

        for (const comment of comments) {
            if (comment.unwanted) stats.totalUnwanted++;
            if (comment.question) stats.totalQuestion++;
            if (comment.feedback) stats.totalFeedback++;
            if (comment.idea) stats.totalIdea++;
            if (comment.collaboration) stats.totalCollaboration++;
        }

        return stats;
    }

}