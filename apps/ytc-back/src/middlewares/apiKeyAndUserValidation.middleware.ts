/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { NextFunction, Request, Response } from 'express';
import { ApiKeyService } from '../services/apikey.service';
import { UserService } from '../services/user.service';

/**
 * Middleware function to validate the API key in the request header.
 * @param excludedRoutes - An array of routes to exclude from API key validation.
 * @returns Express middleware function.
 */
export function ApiKeyAndUserValidation(excludedRoutes: string[] = []) {
    return async function (req: Request, res: Response, next: NextFunction) {
        // Exclude routes from API key validation
        if (excludedRoutes.some(route => req.url.startsWith(route))) {
            next();
            return;
        }

        const apiKey = req.header('api-key');

        // Check if apiKey is empty
        if (apiKey === undefined || typeof apiKey !== 'string' || apiKey.trim() === '') {
            res.status(401).json({ error: 'API key is missing' });
            return;
        }

        // Validate the API key from the ones we have in the database
        const apikeyService = new ApiKeyService();
        const validApiKey = await apikeyService.ValidateApiKey(apiKey);

        if (!validApiKey) {
            res.status(403).json({ error: 'Invalid API key' });
            return;
        }

        // Get the userId from the database
        const userService = new UserService();
        const userId = await apikeyService.GetUserIdFromApiKey(apiKey);
        if (!userId) {
            return res.status(403).json({ error: 'Api key not linked to any user' });
        }

        // Get the user from the database
        const user = await userService.GetUserFromId(userId);
        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }

        // Add the user to the request object
        req.user = user;

        next();
    };
}