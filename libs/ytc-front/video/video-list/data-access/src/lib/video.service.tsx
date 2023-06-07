import { MOCK_API_KEY, MOCK_API_URL } from '@org/shared/mock-backend/utils';
import { VideoSchema, VideoType } from '@org/ytc-front/shared/video/util';
import { map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HTTP_METHOD, ROUTES } from '@org/shared/ytc-front/routes/util';

export function getVideoList(channelId: string): Observable<VideoType[]> {
  return ajax<VideoType[]>({
    url: `${MOCK_API_URL}/${ROUTES.VIDEOS}?${ROUTES.pChannelId}=${channelId}`,
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
      'api-key': MOCK_API_KEY,
    },
  }).pipe(
    map(({ response }: AjaxResponse<VideoType[]>) => {
      if (Array.isArray(response)) {
        return response.map((video: VideoType) => VideoSchema.parse(video));
      } else {
        throw new Error('Response is not an array.');
      }
    }),
  );
}
