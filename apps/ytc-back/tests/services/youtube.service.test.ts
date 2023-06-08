/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { YoutubeAPIService } from '../../src/services/youtube.service';

describe('YoutubeAPI', () => {
    let youtubeAPI: YoutubeAPIService;

    beforeAll(() => {
        if (!process.env.YT_API_KEY) {
            throw new Error('YT_API_KEY is not set');
        }
        
        youtubeAPI = YoutubeAPIService.getInstance();
    });

    describe('GetYoutubeComments', () => {
        it('should return an array of comment items', async () => {
            const videoId = 'KAQlI52dYQE';
            const paginationParams = { maxResults: 5 };
            const response = await youtubeAPI.GetYoutubeComments(videoId, paginationParams);
            expect(response).toBeDefined();
            expect(response.items).toBeDefined();
            expect(Array.isArray(response.items)).toBe(true);
            expect(response.items.length).toEqual(paginationParams.maxResults);
        });
    });

    describe('GetYoutubeChannelVideos', () => {
        it('should return an array of video items', async () => {
            const channelId = 'UCAhaFPP6v3WCfK5Tjao0B7A';
            const paginationParams = { maxResults: 5 };
            const response = await youtubeAPI.GetYoutubeChannelVideos(channelId, paginationParams);
            expect(response).toBeDefined();
            expect(response.items).toBeDefined();
            expect(Array.isArray(response.items)).toBe(true);
            expect(response.items.length).toEqual(paginationParams.maxResults);
        });
    });
});