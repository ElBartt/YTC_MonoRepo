/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';
import { VideoService } from '../services/video.service';

/**
 * Controller class for handling comments related API requests.
 */
export class CommentController {
    private commentService: CommentService;
    private videoService: VideoService;

    /**
     * Creates a new instance of the CommentController class.
     * Initializes the commentService property with a new instance of the CommentService class.
     */
    constructor() {
        this.commentService = new CommentService();
        this.videoService = new VideoService();
    }

    /**
     * Handles GET requests to retrieve comments for a specific video.
     * If the user is not an admin and the videoId is not associated with the user, returns a 401.
     * If no comments are found for the videoId, returns a 404.
     * Otherwise, sorts the comments by relevance and returns them in the response.
     * @param req - The request object.
     * @param res - The response object.
     * @returns Promise<void>
     */
    async getComments(req: Request, res: Response): Promise<void> {
        try {
            // Get the videoId from the query parameters
            const videoId = req.query?.videoId?.toString();
            if (!videoId) {
                res.status(400).send('Missing videoId parameter');
                return;
            }

            // If the user is not an admin and the videoId is not associated with the user, return a 401
            const reqUserId = req.user.id;
            const isVideoIdAssociatedWithUser = await this.videoService.IsVideoIdAssociatedWithUserId(videoId, reqUserId);
            if (!isVideoIdAssociatedWithUser && !req.user.is_admin) {
                res.status(401).send('Unauthorized to access this resource');
                return;
            }

            // Get the comments for the videoId
            const forceRefresh = req.query?.forceRefresh === 'true';
            const comments = await this.commentService.GetComments(videoId, forceRefresh);
            if (!comments || comments.length === 0) {
                res.status(404).send('No comments found');
                return;
            }

            // Sort the comments by relevance and return them in the response
            comments.sort(CommentService.SortByRelevanceOrder);
            res.status(200).send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching comments');
        }
    }
}