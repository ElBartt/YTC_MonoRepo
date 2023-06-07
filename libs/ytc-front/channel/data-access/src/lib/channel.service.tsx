import { ChannelSchema, ChannelType } from '@org/ytc-front/channel/util';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { MOCK_API_URL } from '@org/shared/mock-backend/utils';
import { catchError, map, Observable, of } from 'rxjs';

export function getChannelList(userId: number, apiKey: string): Observable<ChannelType[]> {
  return ajax<ChannelType[]>({
    url: `${MOCK_API_URL}/channels?userId=${userId}`,
    method: 'GET',
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
