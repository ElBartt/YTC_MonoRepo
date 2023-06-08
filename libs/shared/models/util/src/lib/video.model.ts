/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/
import { z } from 'zod';

/**
 * Represents a video in the database.
 * @property {string} id - The ID of the video.
 * @property {string} name - The name of the video.src/models.ts
 * @property {Date} date - The date the video was uploaded.
 * @property {string} channelId - The ID of the channel the video belongs to.
 */

export const VideoSchema = z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    channel_id: z.string(),
});

export type VideoType = z.infer<typeof VideoSchema>;
