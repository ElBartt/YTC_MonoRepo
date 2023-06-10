/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

/**
 * Represents an API key in the database.
 * @property {string} key - The API key.
 * @property {string} name - The name associated with the API key.
 * @property {number} user_id - The ID of the user that owns the API key.
 */
export interface ApiKey {
    key: string;
    name: string;
    user_id: number;
}
