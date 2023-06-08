/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { ChannelService } from '../services/channel.service';
import { StatService } from "../services/stat.service";
import { VideoService } from '../services/video.service';
import { Stat } from '../types/interface';

/**
 * Controller class for handling requests related to video/channel statistics.
 */
export class StatController {
    private statService: StatService;
    private videoService: VideoService;
    private channelService: ChannelService;

    /**
     * Creates an instance of StatController.
     */
    constructor() {
        this.statService = new StatService();
        this.videoService = new VideoService();
        this.channelService = new ChannelService();
    }

    /**
     * Retrieves statistics for a video or channel based on the provided query parameters.
     * @param req - The request object containing the query parameters.
     * @param res - The response object used to send the retrieved statistics.
     * @returns The retrieved statistics for the video or channel.
     */
    async getStats(req: Request, res: Response) {
        try {
            const videoId = req.query?.videoId?.toString();
            const channelId = req.query?.channelId?.toString();
            const reqUserId = req.user.id;

            if (!videoId && !channelId) {
                return res.status(400).send('Missing videoId or channelId parameters');
            } else if (videoId && channelId) {
                return res.status(400).send('Only one of videoId or channelId parameters can be specified');
            }

            let isAssociatedWithUser: boolean;
            let notFoundMessage: string;

            if (videoId) {
                isAssociatedWithUser = await this.videoService.IsVideoIdAssociatedWithUserId(videoId, reqUserId);
                notFoundMessage = 'No stats found for video';
            } else {
                isAssociatedWithUser = await this.channelService.IsChannelIdAssociatedWithUserId(channelId!, reqUserId);
                notFoundMessage = 'No stats found for channel';
            }

            if (!isAssociatedWithUser && !req.user.is_admin) {
                return res.status(401).send('Unauthorized to access this resource');
            }

            let stats: Stat | undefined;

            if (videoId) {
                stats = await this.statService.GetStatsForVideo(videoId);
            } else {
                stats = await this.statService.GetStatsForChannel(channelId!);
            }

            if (!stats) {
                return res.status(404).send(notFoundMessage);
            }

            return res.send(stats);
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    }
}