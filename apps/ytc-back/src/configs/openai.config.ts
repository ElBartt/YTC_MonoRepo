/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env'});

/**
 * Configuration object for OpenAI API connection.
 */
export const OAI_CONF = {
    organization: process.env.OAI_ORG_ID,
    apiKey: process.env.OAI_API_KEY,
}