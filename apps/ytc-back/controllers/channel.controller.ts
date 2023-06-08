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
            const userId = Number(req.query?.userId);

            if (!userId) {
                res.status(400).send('Missing userId parameter');
                return;
            }

            // If the user is not an admin and the userId is not the same as the user in the request, return a 401
            if (userId !== req.user.id && !req.user.is_admin) {
                res.status(401).send('Unauthorized to access this resource');
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