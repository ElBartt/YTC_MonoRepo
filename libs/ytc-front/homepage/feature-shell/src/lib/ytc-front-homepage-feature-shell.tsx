import { YtcFrontHomepageFeature } from '@ytc/ytc-front/homepage/feature';
import { videoListRoutes } from '@ytc/ytc-front/video/video-list/feature-shell';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { channelListRoutes } from '@ytc/ytc-front/channel/feature-shell';

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
