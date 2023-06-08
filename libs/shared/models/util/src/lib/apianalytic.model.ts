/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

/**
 * Represents analytics data for an API request.
 * @property {string} api_key - The API key used for the request.
 * @property {Date} timestamp - The timestamp of the request.
 * @property {string} route - The route of the request.
 * @property {string} parameters - The parameters of the request.
 * @property {string} method - The HTTP method of the request.
 * @property {number} status_code - The HTTP status code of the response.
 * @property {number} response_time - The response time of the request in milliseconds.
 */
export interface ApiAnalytic {
    api_key: string;
    timestamp: Date;
    route: string;
    parameters: string;
    method: string;
    status_code: number;
    response_time: number;
}