import { YtcFrontVideoVideoDetailsFeature } from '@org/ytc-front/video/video-details/feature';
import { YtcFrontVideoListFeature } from '@org/ytc-front/video/video-list/feature';
import { RouteObject } from 'react-router-dom';

export const videoListRoutes: RouteObject[] = [
  {
    path: '/videos/:id',
    element: <YtcFrontVideoListFeature />,
  },
  {
    path: '/videos/details/:id',
    element: <YtcFrontVideoVideoDetailsFeature />,
  },
];
