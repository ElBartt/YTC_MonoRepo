/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { NextFunction, Request, Response } from 'express';
import { ApiAnalyticService } from '../services/apianalytic.service';
import { ApiAnalytic } from '@ytc/shared/models/util';

/**
 * Middleware function that sends API analytics to the database.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The Express next function.
 */
export function SendApiAnalytics(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
        const apiAnalyticService = new ApiAnalyticService();

        // Insert API analytics into the database
        const apiAnalytic: ApiAnalytic = {
            timestamp: new Date(),
            route: req.originalUrl.split('?')[0],
            parameters: apiAnalyticService.StringifyQueryParams(req.query),
            method: req.method,
            status_code: res.statusCode,
            response_time: Date.now() - (res.locals.startTime as number),
            api_key: req.headers['api-key'] as string,
        };

        apiAnalyticService.InsertAnalytic(apiAnalytic);
    });

    next();
}
