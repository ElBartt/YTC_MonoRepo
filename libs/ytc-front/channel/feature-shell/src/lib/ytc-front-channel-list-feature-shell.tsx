import { RouteObject } from 'react-router-dom';
import { ChannelList } from '@ytc/ytc-front/channel/feature';

export const channelListRoutes: RouteObject[] = [
  {
    path: '/channels',
    element: <ChannelList />,
  },
];
