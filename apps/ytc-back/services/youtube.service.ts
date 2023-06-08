/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { google, youtube_v3 } from 'googleapis';
import { YT_CONF } from '../configs/youtube.config';
import { PaginationParams, YoutubeFilteredResponse } from '../types/interface';

/**
 * An object containing default pagination parameters for YouTube API requests.
 * @property {number} maxResults - The maximum number of results to return per page. Defaults to 10.
 * @property {string} pageToken - The token for the page of results to retrieve. Defaults to an empty string.
 */
const defaultPaginationParams: PaginationParams = {
    maxResults: 10,
    pageToken: undefined
}

/**
 * A class representing the YouTube API service.
 */
export class YoutubeAPIService {
    private static instance: YoutubeAPIService;
    private youtube: youtube_v3.Youtube;

    /**
     * Creates a new instance of the YoutubeAPI class.
     * @constructor
     */
    private constructor() {
        this.youtube = google.youtube(YT_CONF);
    }

    /**
     * Returns the singleton instance of the YoutubeAPI class.
     * @returns The singleton instance of the YoutubeAPI class.
     */
    public static getInstance(): YoutubeAPIService {
        if (!YoutubeAPIService.instance) {
            YoutubeAPIService.instance = new YoutubeAPIService();
        }
        return YoutubeAPIService.instance;
    }

    /**
     * Retrieves the comments for a given YouTube video.
     * @param videoId The ID of the YouTube video to retrieve comments for.
     * @param paginationParams An optional object containing pagination parameters.
     * @param paginationParams.maxResults The maximum number of results to return per page. Defaults to 10.
     * @param paginationParams.pageToken The token for the page of results to retrieve. Defaults to an empty string.
     * @returns An array of comment items.
     */
    async GetYoutubeComments(videoId: string, paginationParams: PaginationParams = defaultPaginationParams): Promise<YoutubeFilteredResponse<youtube_v3.Schema$CommentThread[]>> {
        try {
            const { data } = await this.youtube.commentThreads.list({
                part: ['snippet'],
                order: 'relevance',
                videoId: videoId,
                moderationStatus: 'published',
                maxResults: paginationParams.maxResults,
                pageToken: paginationParams.pageToken
            });
            return { 
                nextPageToken: data.nextPageToken,
                pageInfo: data.pageInfo,
                items: data.items || []
            };
        } catch (error: any) {
            console.error(`[YOUTUBE] Error retrieving comments for video ${videoId}`);
            return { 
                nextPageToken: undefined,
                pageInfo: undefined,
                items: []
            };
        }
    }

    /**
     * Retrieves the videos for a given YouTube channel.
     * @param channelId The ID of the YouTube channel to retrieve videos for.
     * @param paginationParams An optional object containing pagination parameters.
     * @param paginationParams.maxResults The maximum number of results to return per page. Defaults to 10.
     * @param paginationParams.pageToken The token for the page of results to retrieve. Defaults to an empty string.
     * @returns An array of video items.
     */
    async GetYoutubeChannelVideos(channelId: string, paginationParams: PaginationParams = defaultPaginationParams): Promise<YoutubeFilteredResponse<youtube_v3.Schema$SearchResult[]>> {
        try {
            const { data } = await this.youtube.search.list({
                part: ['snippet'],
                order: 'date',
                channelId: channelId,
                maxResults: paginationParams.maxResults,
                pageToken: paginationParams.pageToken
            });
            return { 
                nextPageToken: data.nextPageToken,
                prevPageToken: data.prevPageToken,
                pageInfo: data.pageInfo,
                items: data.items || []
            };
        } catch (error: any) {
            console.error(`[YOUTUBE] Error retrieving videos for channel ${channelId}`);
            return { 
                nextPageToken: undefined,
                prevPageToken: undefined,
                pageInfo: undefined,
                items: []
            };
        }
    }
}