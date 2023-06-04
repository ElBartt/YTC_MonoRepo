import { YtcFrontVideoVideoDetailsFeature } from '@org/ytc-front/video/video-details/feature';
import { YtcFrontVideoListFeature } from '@org/ytc-front/video/video-list/feature';
import { RouteObject } from 'react-router-dom';

export const videoListRoutes: RouteObject[] = [
  {
    path: '/videos',
    element: <YtcFrontVideoListFeature />,
  },
  {
    path: '/videos/:id',
    element: <YtcFrontVideoVideoDetailsFeature video={{id:"123", title:"Video", date:"2023-01-01", channel_id:"456" }} />,
  },
];
