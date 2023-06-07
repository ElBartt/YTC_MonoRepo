import { YtcFrontHomepageFeature } from '@org/ytc-front/homepage/feature';
import { videoListRoutes } from '@org/ytc-front/video/video-list/feature-shell';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { channelListRoutes } from '@org/ytc-front/channel/feature-shell';

const router = createBrowserRouter([
  {
    path: '/',
    element: <YtcFrontHomepageFeature />,
  },
  ...videoListRoutes,
  ...channelListRoutes,
]);

export function YtcFrontHomepageFeatureShell() {
  return <RouterProvider router={router} />;
}
