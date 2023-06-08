/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { NextFunction, Request, Response } from 'express';

export function StartRequest(req: Request, res: Response, next: NextFunction) {
    // Set the start time in the response locals for analytics
    res.locals.startTime = Date.now();

    next();
}