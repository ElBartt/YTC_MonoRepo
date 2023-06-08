/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Database } from "../database/database";
import { Channel } from "../models/channel.model";

export class ChannelService {
    private db: Database;

    /**
     * Creates an instance of ChannelService.
     * Initializes the database instance.
     */
    constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Retrieves all channels associated with a given user ID.
     * @param userId The ID of the user whose channels to retrieve.
     * @returns A Promise that resolves to an array of Channel objects.
     */
    async GetChannelsFromUserId(userId: string): Promise<Channel[]> {
        if (!userId) return [];
        return await this.db.query<Channel[]>("SELECT * FROM channel WHERE user_id = ?", [userId]);
    }
    
    /**
     * Retrieves a channel with a given channel ID.
     * @param channelId The ID of the channel to retrieve.
     * @returns A Promise that resolves to a Channel object if the channel exists, otherwise undefined.
     */
    async GetChannel(channelId: string): Promise<Channel | undefined> {
        if (!channelId) return undefined;
        const [channel] = await this.db.query<Channel[]>("SELECT * FROM channel WHERE id = ? LIMIT 1", [channelId]);
        return channel;
    }
}