/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Request, Response } from 'express';
import { ApiAnalyticService } from '../services/apianalytic.service';

export class ApiAnalyticsController {
    private apiAnalyticService: ApiAnalyticService;

    constructor() {
        this.apiAnalyticService = new ApiAnalyticService();
    }

    async getMostAccessedRoutes(req: Request, res: Response) {
        const routes = await this.apiAnalyticService.GetMostAccessedRoutes();
        res.json(routes);
    }

    async getMostUsedParameters(req: Request, res: Response) {
        const parameters = await this.apiAnalyticService.GetMostUsedParameters();
        res.json(parameters);
    }

    async getErrorCount(req: Request, res: Response) {
        const errorCount = await this.apiAnalyticService.GetErrorCount();
        res.json(errorCount);
    }

    async getAverageResponseTime(req: Request, res: Response) {
        const averageResponseTime = await this.apiAnalyticService.GetAverageResponseTime();
        res.json(averageResponseTime);
    }

    async getApiKeyUsage(req: Request, res: Response) {
        const apiKeyUsage = await this.apiAnalyticService.GetApiKeyUsage();
        res.json(apiKeyUsage);
    }
}