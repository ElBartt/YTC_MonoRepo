/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

/**
 * Represents a YouTube channel in the database.
 * @property {string} id - The ID of the channel.
 * @property {string} name - The name of the channel.
 * @property {string} thumbnail - The URL of the channel's thumbnail.
 * @property {number} user_id - The ID of the user that owns the channel.
 */
export interface Channel {
    id: string;
    name: string;
    thumbnail: string;
    user_id: number;
}
