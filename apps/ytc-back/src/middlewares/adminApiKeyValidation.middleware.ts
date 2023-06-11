/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

export async function AdminApiKeyValidation(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('api-key'); // We already know it's not null, because the middleware is only called if the api-key exists

    // Check if user is admin
    const userService = new UserService();
    const isAdmin = await userService.IsUserAdmin(apiKey);

    if (!isAdmin) {
        res.status(403).json({ error: 'You are not authorized to perform this action.' });
        return;
    }

    next();
}
