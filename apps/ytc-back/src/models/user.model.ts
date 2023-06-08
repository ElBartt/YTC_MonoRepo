/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

/**
 * Represents a User in the database.
 * @property {number} id - The ID of the user.
 * @property {string} username - The username of the user.
 * @property {boolean} is_admin - Whether or not the user is an admin.
 */
export interface User {
    id: number;
    username: string;
    is_admin: boolean;
}