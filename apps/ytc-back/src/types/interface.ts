/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

/**
 * An interface representing pagination parameters for a YouTube API request.
 * @property {number | undefined} maxResults - The maximum number of results to return per page.
 * @property {string | undefined} pageToken - The token for the page of results to retrieve.
 */
export interface PaginationParams {
    maxResults?: number;
    pageToken?: string;
}

/**
 * An interface representing a filtered response from the YouTube API.
 * @template T The type of items in the response.
 * @property {T} items - The items in the response.
 * @property {string | null} nextPageToken - The token for the next page of results, if available.
 * @property {string | null} prevPageToken - The token for the previous page of results, if available.
 * @property {Object | null} pageInfo - Information about the results returned.
 * @property {number | null} pageInfo.totalResults - The total number of results available.
 * @property {number | null} pageInfo.resultsPerPage - The number of results per page.
 */
export interface YoutubeFilteredResponse<T> {
    items: T;
    nextPageToken?: string | null;
    prevPageToken?: string | null;
    pageInfo?: {
        totalResults?: number | null;
        resultsPerPage?: number | null;
    };
}
