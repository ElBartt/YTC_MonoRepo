import { VideoSchema, VideoType } from '@ytc/ytc-front/shared/video/util';
import { map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HTTP_METHOD, ROUTES } from '@ytc/shared/ytc-front/routes/util';

export function getVideoList(channelId: string, apiKey: string): Observable<VideoType[]> {
  return ajax<VideoType[]>({
    url: `${import.meta.env.VITE_APP_BACK_END_URL}/${ROUTES.VIDEOS}?${ROUTES.pChannelId}=${channelId}`,
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
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
