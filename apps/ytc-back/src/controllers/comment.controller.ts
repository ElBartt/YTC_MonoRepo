/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';

/**
 * Controller class for handling comments related API requests.
 */
export class CommentController {
    private commentService: CommentService;

    /**
     * Creates a new instance of the CommentController class.
     * Initializes the commentService property with a new instance of the CommentService class.
     */
    constructor() {
        this.commentService = new CommentService();
    }

    /**
     * Retrieves comments for a given video ID and returns them in the response.
     * If no comments are found, returns a 404 error.
     * If an error occurs while fetching comments, returns a 500 error.
     * @param req - The request object containing the videoId and forceRefresh query parameters.
     * @param res - The response object to send the comments or error message.
     * @returns Promise<void>
     */
    async getComments(req: Request, res: Response): Promise<void> {
        try {
            // Get the videoId from the query string
            const videoId: string | undefined = req.query?.videoId?.toString();

            if (!videoId) {
                res.status(400).send('Missing videoId parameter');
                return;
            }

            const forceRefresh: boolean = req.query?.forceRefresh === 'true';
            
            // Get the comments from the service
            const comments = await this.commentService.GetComments(videoId, forceRefresh);
            comments.sort(this.commentService.SortByRelevanceOrder);

            // If we don't have any comments, return a 404
            if (comments.length === 0) {
                res.status(404).send('No comments found');
                return;
            }

            // Return the comments
            res.status(200).send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching comments');
        }
    }
}