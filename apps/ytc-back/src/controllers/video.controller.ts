/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { VideoService } from '../services/video.service';

/**
 * Controller class for handling video-related requests.
 */
export class VideoController {
    private videoService: VideoService;

    /**
     * Creates an instance of VideoController.
     */
    constructor() {
        this.videoService = new VideoService();
    }

    /**
     * Retrieves videos from the service based on the provided channelId and forceRefresh flag.
     * @param req - The request object.
     * @param res - The response object.
     * @returns Promise<void>
     */
    async getVideos(req: Request, res: Response): Promise<void> {
        try {
            // Get the channelId from the query string
            const channelId: string | undefined = req.query?.channelId?.toString();

            if (!channelId) {
                res.status(400).send('Missing channelId parameter');
                return;
            }

            const forceRefresh: boolean = req.query?.forceRefresh === 'true';

            // Get the videos from the service
            const videos = await this.videoService.GetVideos(channelId, forceRefresh);

            // If we don't have any videos, return a 404
            if (!videos || videos.length === 0) {
                res.status(404).send('No videos found');
                return;
            }

            // Return the videos
            res.status(200).send(videos);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching videos');
        }
    }
}