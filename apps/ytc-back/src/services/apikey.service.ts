/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Database } from '../database/database';
import { ApiKey } from '@ytc/shared/models/util';

/**
 * A service for validating API keys.
 */
export class ApiKeyService {
    private db: Database;

    /**
     * Creates an instance of ApiKeyService.
     * Initializes the database instance.
     */
    constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Validates an API key by checking if it exists in the database.
     * @param apiKey The API key to validate.
     * @returns A boolean indicating whether the API key is valid or not.
     */
    async ValidateApiKey(apiKey: string): Promise<boolean> {
        if (!apiKey) return false;
        const [key] = await this.db.query<ApiKey[]>('SELECT 1 FROM apikey WHERE `key` = ? LIMIT 1', [apiKey]);
        return !!key;
    }

    /**
     * Retrieves the user ID associated with the given API key.
     * @param apiKey The API key to retrieve the user ID for.
     * @returns A Promise that resolves to the user ID associated with the API key, or undefined if the API key is invalid.
     */
    async GetUserIdFromApiKey(apiKey: string): Promise<number | undefined> {
        if (!apiKey) return undefined;
        const [key] = await this.db.query<ApiKey[]>('SELECT user_id FROM apikey WHERE `key` = ?', [apiKey]);
        return key?.user_id;
    }
}
