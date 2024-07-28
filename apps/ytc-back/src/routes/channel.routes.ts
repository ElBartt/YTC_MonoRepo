/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Router } from "express";
import { ChannelController } from "../controllers/channel.controller";

/**
 * Router object for handling channel routes.
 * @name channelRouter
 * @type {Router}
 * @property {function} get - Express route handler for GET requests to retrieve channels.
 */
export const channelRouter = Router();
const channelController = new ChannelController();

channelRouter.post('/', channelController.addChannel.bind(channelController));

channelRouter.get('/', channelController.getChannels.bind(channelController));
