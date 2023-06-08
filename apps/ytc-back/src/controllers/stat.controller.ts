/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { StatService } from "../services/stat.service";

/**
 * Controller class for handling requests related to video/channel statistics.
 */
export class StatController {
    private statService: StatService;

    /**
     * Creates an instance of StatController.
     */
    constructor() {
        this.statService = new StatService();
    }

    /**
     * Retrieves statistics for a video or channel based on the provided query parameters.
     * @param req - The request object containing the query parameters.
     * @param res - The response object used to send the retrieved statistics.
     * @returns The retrieved statistics for the video or channel.
     */
    async getStats(req: Request, res: Response) {
        const { videoId, channelId } = req.query;

        try {
            let stats;

            if (videoId) {
                stats = await this.statService.GetStatsForVideo(videoId.toString());
            } else if (channelId) {
                stats = await this.statService.GetStatsForChannel(channelId.toString());
            } else {
                return res.status(400).send('Missing videoId or channelId parameters');
            }

            if (!stats) {
                return res.status(404).send('Stats not found');
            }

            res.send(stats);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}