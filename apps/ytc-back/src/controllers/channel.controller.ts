/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { ChannelService } from '../services/channel.service';

/**
 * Controller class for handling channel-related requests.
 */
export class ChannelController {
    private channelService: ChannelService;

    /**
     * Creates an instance of ChannelController.
     */
    constructor() {
        this.channelService = new ChannelService();
    }

    /**
     * Retrieves channels associated with a given user ID.
     * @param req The request object.
     * @param res The response object.
     * @returns Promise<void>
     */
    async getChannels(req: Request, res: Response): Promise<void> {
        try {
            // Get the channelId from the query string
            const userId: string | undefined = req.query?.userId?.toString();

            if (!userId) {
                res.status(400).send('Missing userId parameter');
                return;
            }

            const channels = await this.channelService.GetChannelsFromUserId(userId);

            if (!channels || channels.length === 0) {
                res.status(404).send('No channels found');
                return;
            }
            
            res.status(200).send(channels);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching channels');
        }
    }
}