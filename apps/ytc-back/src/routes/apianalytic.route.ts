/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { Router } from 'express';
import { ApiAnalyticsController } from '../controllers/apianalytic.controller';

export const apiAnalyticRouter = Router();
const apiAnalyticsController = new ApiAnalyticsController();

apiAnalyticRouter.get('/most-accessed-routes', apiAnalyticsController.getMostAccessedRoutes.bind(apiAnalyticsController));
apiAnalyticRouter.get('/most-used-parameters', apiAnalyticsController.getMostUsedParameters.bind(apiAnalyticsController));
apiAnalyticRouter.get('/error-count', apiAnalyticsController.getErrorCount.bind(apiAnalyticsController));
apiAnalyticRouter.get('/average-response-time', apiAnalyticsController.getAverageResponseTime.bind(apiAnalyticsController));
apiAnalyticRouter.get('/api-key-usage', apiAnalyticsController.getApiKeyUsage.bind(apiAnalyticsController));