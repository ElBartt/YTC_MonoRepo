import { MOCK_API_KEY, MOCK_API_URL } from '@org/shared/mock-backend/utils';
import { VideoSchema, VideoType } from '@org/ytc-front/shared/video/util';
import { Observable, map } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';
export function getVideoList(): Observable<VideoType[]> {
  return ajax<VideoType[]>({
    url: `${MOCK_API_URL}/videos?channelId=UCAhaFPP6v3WCfK5Tjao0B7A`,
    method: 'GET',
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
