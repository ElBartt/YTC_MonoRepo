/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";

/**
 * Router object for handling comment routes.
 * @name commentRouter
 * @type {Router}
 * @property {function} get - Express route handler for GET requests to retrieve comments.
 */
export const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get('/', commentController.getComments.bind(commentController));