/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { ChannelService } from '../services/channel.service';
import { VideoService } from '../services/video.service';

/**
 * Controller class for handling video-related requests.
 */
export class VideoController {
  private videoService: VideoService;
  private channelService: ChannelService;

  /**
   * Creates an instance of VideoController.
   */
  constructor() {
    this.videoService = new VideoService();
    this.channelService = new ChannelService();
  }

  /**
   * Retrieves the videos for a given channel ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A Promise that resolves to void.
   */
  async getVideos(req: Request, res: Response): Promise<void> {
    try {
      // Get the channelId from the request
      const channelId: string | undefined = req.query?.channelId?.toString();
      if (!channelId) {
        res.status(400).send('Missing channelId parameter');
        return;
      }

      // If the user is not an admin and the channelId is not associated with the user, return a 401
      const reqUserId = req.user.id;
      const isChannelIdAssociatedWithUserId = await this.channelService.IsChannelIdAssociatedWithUserId(
        channelId,
        reqUserId,
      );
      if (!isChannelIdAssociatedWithUserId && !req.user.is_admin) {
        res.status(401).send('Unauthorized to access this resource');
        return;
      }

      // Get the comments for the channelId
      const forceRefresh: boolean = req.query?.forceRefresh === 'true';
      const videos = await this.videoService.GetVideos(channelId, forceRefresh);
      if (!videos || videos.length === 0) {
        res.status(404).send('No videos found');
        return;
      }

      // Sort the videos by relevance and return them in the response
      videos.sort(VideoService.SortVideosByDate);
      res.status(200).send(videos);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching videos');
    }
  }
}
