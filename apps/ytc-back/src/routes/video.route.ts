/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Router } from "express";
import { VideoController } from "../controllers/video.controller";

/**
 * Router object for handling video routes.
 * @name videoRouter
 * @type {Router}
 * @property {function} get - Express route handler for GET requests to retrieve videos.
 */
export const videoRouter = Router();
const videoController = new VideoController();

videoRouter.get('/', videoController.getVideos.bind(videoController));