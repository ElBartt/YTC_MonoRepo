import { VideoSchema, VideoType } from '@org/ytc-front/shared/video/util';
import { Observable, map } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

// TODO: Move theses variables to a better place
const backendUrl = 'http://localhost:1234';
const apiKey = 'BczuaAjc7nUf-eiCSp1lpTjHThvdrqEM88Esgs_N5R6bZpQPv-OxkT_aInwwASP5';

export function getVideoList(): Observable<VideoType[]> {
  return ajax<VideoType[]>({
    url: `${backendUrl}/videos?channelId=UCAhaFPP6v3WCfK5Tjao0B7A`,
    method: 'GET',
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
