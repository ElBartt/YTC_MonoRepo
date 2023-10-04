/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { UserType } from '@ytc/shared/models/util';
import { Database } from '../database/database';
import { ApiKeyService } from './apikey.service';

export class UserService {
    private db: Database;

    /**
     * Creates an instance of UserService.
     * Initializes the database instance.
     */
    constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Retrieves a user from the database based on their ID.
     * @param userId The ID of the user to retrieve.
     * @returns A Promise that resolves to the UserType object if found, or undefined if not found.
     */
    async GetUserFromId(userId: number): Promise<UserType | undefined> {
        if (!userId) return undefined;
        const users = await this.db.query<UserType[]>('SELECT * FROM user WHERE id = ? LIMIT 1', [userId]);
        return users.length === 0 ? undefined : users[0];
    }

    /**
     * Retrieves a user from the database based on their API key.
     * @param apiKey The API key of the user to retrieve.
     * @returns A Promise that resolves to the UserType object if found, or undefined if not found.
     */
    async GetUserFromApiKey(apiKey: string): Promise<UserType | undefined> {
        // Get user id linked to the API key from apiservice
        const apikeyService = new ApiKeyService();
        const userId = await apikeyService.GetUserIdFromApiKey(apiKey);

        if (!userId) {
            return undefined;
        }

        // Get user from userservice
        const userService = new UserService();
        const user = await userService.GetUserFromId(userId);

        return user;
    }

    /**
     * Checks if a user is an admin.
     * @param apiKey The API key of the user to check.
     * @returns A Promise that resolves to a boolean indicating whether the user is an admin or not.
     */
    async IsUserAdmin(apiKey: string): Promise<boolean> {
        const user = await this.GetUserFromApiKey(apiKey);
        return user ? user.is_admin : false;
    }

    /** 
     * Add a new user to the database if it doesn't already exist.
     * @param user The user to add to the database.
     * @returns A Promise that resolves to the ID of the newly created user.
     */
    async AddUser(user: UserType): Promise<number> {
        const result = await this.db.query('INSERT IGNORE INTO user SET ?', [user]);
        return result['insertId'];
    }
}
