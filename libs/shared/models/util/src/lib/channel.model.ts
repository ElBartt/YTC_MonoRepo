/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { z } from 'zod';

/**
 * Represents a YouTube channel in the database.
 * @property {string} id - The ID of the channel.
 * @property {string} name - The name of the channel.
 * @property {string} thumbnail - The URL of the channel's thumbnail.
 * @property {number} user_id - The ID of the user that owns the channel.
 */
export const ChannelSchema = z.object({
    id: z.string(),
    name: z.string(),
    thumbnail: z.string(),
    user_id: z.number(),
});

export type ChannelType = z.infer<typeof ChannelSchema>;
