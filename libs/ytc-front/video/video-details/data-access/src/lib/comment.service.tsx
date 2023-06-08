import { CommentSchema, CommentType } from '@ytc/ytc-front/shared/comment/utils';
import { map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HTTP_METHOD, ROUTES } from '@ytc/shared/ytc-front/routes/util';

export function getCommentList(videoId: string, apiKey: string): Observable<CommentType[]> {
  return ajax<CommentType[]>({
    url: `${import.meta.env.VITE_APP_BACK_END_URL}/${ROUTES.COMMENTS}?${ROUTES.pVideoId}=${videoId}`,
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
  }).pipe(
    map(({ response }: AjaxResponse<CommentType[]>) => {
      if (Array.isArray(response)) {
        return response.map((comment: CommentType) => CommentSchema.parse(comment));
      } else {
        throw new Error('Response is not an array.');
      }
    }),
  );
}
