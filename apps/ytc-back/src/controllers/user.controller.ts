/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

/**
 * Controller class for handling user-related requests.
 */
export class UserController {
    private userService: UserService;

    /**
     * Creates an instance of UserController.
     */
    constructor() {
        this.userService = new UserService();
    }

    /**
     * Retrieves a user from the database using the provided apikey.
     * @param req The request object.
     * @param res The response object.
     * @returns Promise<void>
     */
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const apikey = req.query?.apikey?.toString();

            if (!apikey) {
                res.status(400).send('Missing apikey parameter');
                return;
            }

            const user = await this.userService.GetUserFromApiKey(apikey);

            if (!user) {
                res.status(404).send('No user found');
                return;
            }

            res.status(200).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching users');
        }
    }
}
