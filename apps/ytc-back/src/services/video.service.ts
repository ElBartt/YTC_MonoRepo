/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { OkPacket } from 'mysql2';
import { Database } from '../database/database';
import { ChannelService } from './channel.service';
import { YoutubeAPIService } from './youtube.service';
import { VideoType } from '@ytc/shared/models/util';

/**
 * Service class for managing videos.
 */
export class VideoService {
    private db: Database;
    private youtubeAPI: YoutubeAPIService;
    private channelService: ChannelService;

    readonly VIDEOS_NUMBER_LIMIT = 10;

    constructor() {
        this.db = Database.getInstance();
        this.youtubeAPI = YoutubeAPIService.getInstance();
        this.channelService = new ChannelService();
    }

    /**
     * Retrieves all videos for a given channel from the database.
     * @param channelId The ID of the channel to retrieve videos for.
     * @returns A promise that resolves to an array of VideoType objects.
     */
    async GetVideosForChannel(channelId: string): Promise<VideoType[]> {
        if (!channelId) return [];
        return await this.db.query<VideoType[]>('SELECT * FROM videos WHERE channel_id = ?', [channelId]);
    }

    /**
     * Retrieves a video from the database by its ID.
     * @param videoId The ID of the video to retrieve.
     * @returns A promise that resolves to a VideoType object if the video is found, or undefined if it is not found.
     */
    async GetVideo(videoId: string): Promise<VideoType | undefined> {
        if (videoId === '') return undefined;
        const videos = await this.db.query<VideoType[]>('SELECT * FROM videos WHERE id = ? LIMIT 1', [videoId]);
        return videos.length === 0 ? undefined : videos[0];
    }

    /**
     * Retrieves videos for a given channel from the database, or from the YouTube API if they are not found in the database.
     * @param channelId The ID of the channel to retrieve videos for.
     * @param forceRefresh If true, the videos will be retrieved from the YouTube API even if they are already in the database.
     * @returns A promise that resolves to an array of VideoType objects.
     */
    async GetVideos(channelId: string, forceRefresh: boolean): Promise<VideoType[]> {
        const channel = await this.channelService.GetChannel(channelId);
        if (!channel) return [];

        if (!forceRefresh) {
            const videos = await this.GetVideosForChannel(channelId);
            if (videos.length > 0) return videos;
        }

        const youtubeVideos = await this.youtubeAPI.GetYoutubeChannelVideos(channelId, {
            maxResults: this.VIDEOS_NUMBER_LIMIT,
        });
        if (!youtubeVideos?.items?.length) return [];

        const dbVideos: VideoType[] = youtubeVideos.items
            .map(video => ({
                id: video.id?.videoId || '',
                title: video.snippet?.title || 'Unknown',
                date: video.snippet?.publishedAt || '',
                channel_id: channelId,
            }))
            .filter(video => video.id !== '');

        await this.InsertVideoList(dbVideos);

        return dbVideos;
    }

    /**
     * Inserts a list of videos into the database, ignoring any duplicates.
     * @param videoList An array of VideoType objects to insert into the database.
     * @returns A promise that resolves to the number of rows affected by the insert operation.
     */
    async InsertVideoList(videoList: VideoType[]): Promise<number> {
        if (videoList.length === 0) return 0;

        const columns = Object.keys(videoList[0]) as Array<keyof VideoType>;
        const sql = `INSERT IGNORE INTO videos (${columns.join(', ')}) VALUES ?`;

        const values = videoList.map(video => columns.map(column => video[column]));

        const result = await this.db.query<OkPacket>(sql, [values]);
        return result.affectedRows;
    }

    /**
     * Checks if a video with the given ID is associated with a user with the given ID.
     * @param videoId The ID of the video to check.
     * @param userId The ID of the user to check.
     * @returns A promise that resolves to true if the video is associated with the user, or false otherwise.
     */
    async IsVideoIdAssociatedWithUserId(videoId: string, userId: number): Promise<boolean> {
        if (!videoId || !userId) return false;

        const video = await this.GetVideo(videoId);
        if (!video) return false;

        const channel = await this.channelService.GetChannel(video.channel_id);
        if (!channel) return false;

        return channel.user_id === userId;
    }

    // Predicate function for sorting videos by date.
    public static SortVideosByDate(a: VideoType, b: VideoType): number {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
}
