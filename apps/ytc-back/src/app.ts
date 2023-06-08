/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { SendApiAnalytics } from './middlewares/sendApiAnalytics.middleware';
import { StartRequest } from './middlewares/startRequest.middleware';
import { validateAdminUserApiKey } from './middlewares/validateAdminUserApiKey.middleware';
import { ValidateApiKeyWithExclusions } from './middlewares/validateApiKey.middleware';
import { apiAnalyticRouter } from './routes/apianalytic.route';
import { channelRouter } from './routes/channel.routes';
import { commentRouter } from './routes/comment.route';
import { statRouter } from './routes/stat.route';
import { userRouter } from './routes/user.route';
import { videoRouter } from './routes/video.route';
import * as swaggerConfigFile from '../docs/swagger.json';

// Set up the Express app
const app = express();

// Enable CORS
app.use(cors());

// Set up middleware to time the start of a request
app.use(StartRequest);

// Set up middleware to insert analytics data into the database (done after the request is complete)
app.use(SendApiAnalytics);

// Set up middleware to validate API key with excluded routes
const excludedRoutes = ['/api-docs', '/users'];
app.use(ValidateApiKeyWithExclusions(excludedRoutes));

// Set up middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfigFile)); // Note: this route is not protected by the ValidateApiKeyWithExclusions middleware

// Set up routes
app.use('/users', userRouter); // Note: this route is not protected by the ValidateApiKeyWithExclusions middleware
app.use('/channels', channelRouter);
app.use('/videos', videoRouter);
app.use('/comments', commentRouter);
app.use('/stats', statRouter);
app.use('/analytics', validateAdminUserApiKey, apiAnalyticRouter);

export default app;
