/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env'});

/**
 * Configuration object for YouTube API connection.
 */
export const YT_CONF = {
    version: 'v3' as 'v3',
    auth: process.env.YT_API_KEY
}
