import { YtcFrontHomepageFeature } from '@org/ytc-front/homepage/feature';
import { videoListRoutes } from '@org/ytc-front/video/video-list/feature-shell';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <YtcFrontHomepageFeature />,
  },
  ...videoListRoutes,
]);

export function YtcFrontHomepageFeatureShell() {
  return <RouterProvider router={router} />;
}
