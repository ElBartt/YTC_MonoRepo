/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Router } from "express";
import { UserController } from "../controllers/user.controller";

/**
 * Router object for handling user routes.
 * @name userRouter
 * @type {Router}
 * @property {function} get - Express route handler for GET requests to retrieve users.
 */
export const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.addUser.bind(userController));

userRouter.get('/', userController.getUsers.bind(userController));