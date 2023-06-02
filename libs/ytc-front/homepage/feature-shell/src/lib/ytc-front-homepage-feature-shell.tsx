import { YtcFrontHomepageFeature } from '@org/ytc-front/homepage/feature';
import { YtcFrontVideoListFeature } from '@org/ytc-front/video-list/feature';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <YtcFrontHomepageFeature />,
  },
  {
    path: '/videos',
    element: <YtcFrontVideoListFeature />,
  },
]);

export function YtcFrontHomepageFeatureShell() {
  return <RouterProvider router={router} />;
}
