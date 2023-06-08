/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Router } from "express";
import { StatController } from "../controllers/stat.controller";

/**
 * Router object for handling stat routes.
 * @name statRouter
 * @type {Router}
 * @property {function} get - Express route handler for GET requests to retrieve stats.
 */
export const statRouter = Router();
const statController = new StatController();

statRouter.get('/', statController.getStats.bind(statController));