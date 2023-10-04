/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { UserType } from '@ytc/shared/models/util';
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

    /**
     * Adds a new user to the database.
     * @param req The request object.
     * @param res The response object.
     * @returns Promise<void>
     */
    async addUser(req: Request, res: Response): Promise<void> {
        try {
            const user: UserType = Object.assign({}, req.body);

            if (!req.user.is_admin) {
                res.status(401).send('Unauthorized to access this resource');
                return;
            }

            if (!user.username) {
                res.status(400).send('Missing username parameter in body');
                return;
            }
            
            if (user.is_admin === undefined) {
                res.status(400).send('Missing is_admin parameter in body');
                return;
            }

            const userId = await this.userService.AddUser(user);

            res.status(201).json({ message: 'User added successfully!', userId });
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while adding a new user');
        }
    }
}
