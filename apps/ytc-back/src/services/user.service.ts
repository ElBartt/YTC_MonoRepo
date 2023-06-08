/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Database } from "../database/database";
import { User } from "../models/user.model";
import { ApiKeyService } from "./apikey.service";

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
     * @returns A Promise that resolves to the User object if found, or undefined if not found.
     */
    async GetUserFromId(userId: string): Promise<User | undefined> {
        if (!userId) return undefined;
        const users = await this.db.query<User[]>("SELECT * FROM user WHERE id = ? LIMIT 1", [userId]);
        return users.length === 0 ? undefined : users[0];
    }

    /**
     * Retrieves a user from the database based on their API key.
     * @param apiKey The API key of the user to retrieve.
     * @returns A Promise that resolves to the User object if found, or undefined if not found.
     */
    async GetUserFromApiKey(apiKey: string): Promise<User | undefined> {
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

    async IsUserAdmin(apiKey: string): Promise<boolean> {
        const user = await this.GetUserFromApiKey(apiKey);
        return user ? user.is_admin : false;
    }
}