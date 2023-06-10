/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { StatisticsType } from '@ytc/shared/models/util';
import { PaginationParams, YoutubeFilteredResponse } from '../../src/types/interface';

describe('PaginationParams', () => {
    it('should have maxResults and pageToken properties', () => {
        const paginationParams: PaginationParams = {
            maxResults: 10,
            pageToken: 'abc',
        };
        expect(paginationParams.maxResults).toBeDefined();
        expect(paginationParams.pageToken).toBeDefined();
    });
});

describe('YoutubeFilteredResponse', () => {
    it('should have items property and optional nextPageToken, prevPageToken, and pageInfo properties', () => {
        const filteredResponse: YoutubeFilteredResponse<string[]> = {
            items: ['item1', 'item2'],
            nextPageToken: 'abc',
            prevPageToken: 'def',
            pageInfo: {
                totalResults: 100,
                resultsPerPage: 10,
            },
        };
        expect(filteredResponse.items).toBeDefined();
        expect(filteredResponse.nextPageToken).toBeDefined();
        expect(filteredResponse.prevPageToken).toBeDefined();
        expect(filteredResponse.pageInfo).toBeDefined();
    });
});

describe('Stat', () => {
    it('should have right properties', () => {
        const stats: StatisticsType = {
            totalComments: 10,
            totalUnwanted: 5,
            totalQuestion: 2,
            totalFeedback: 1,
            totalIdea: 1,
            totalCollaboration: 1,
        };

        expect(stats.totalComments).toBeDefined();
        expect(stats.totalUnwanted).toBeDefined();
        expect(stats.totalQuestion).toBeDefined();
        expect(stats.totalFeedback).toBeDefined();
        expect(stats.totalIdea).toBeDefined();
        expect(stats.totalCollaboration).toBeDefined();
    });
});
