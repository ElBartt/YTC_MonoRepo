import { ChannelSchema, ChannelType } from '@ytc/ytc-front/channel/util';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, Observable, of } from 'rxjs';
import { HTTP_METHOD, ROUTES } from '@ytc/shared/ytc-front/routes/util';

export function getChannelList(userId: number, apiKey: string): Observable<ChannelType[]> {
  return ajax<ChannelType[]>({
    url: `${import.meta.env.VITE_APP_BACK_END_URL}/${ROUTES.CHANNELS}?${ROUTES.pUserId}=${userId}`,
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
  }).pipe(
    map(({ response }: AjaxResponse<ChannelType[]>) => {
      if (Array.isArray(response)) {
        return response.map((channel: ChannelType) => ChannelSchema.parse(channel));
      } else {
        throw new Error('Response is not an array.');
      }
    }),
    catchError(error => {
      return of(error.response);
    }),
  );
}
