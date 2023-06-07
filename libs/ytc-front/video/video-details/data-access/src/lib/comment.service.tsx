import { MOCK_API_KEY, MOCK_API_URL } from '@org/shared/mock-backend/utils';
import { CommentSchema, CommentType } from '@org/ytc-front/shared/comment/utils';
import { map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HTTP_METHOD, ROUTES } from '@org/shared/ytc-front/routes/util';

export function getCommentList(videoId: string): Observable<CommentType[]> {
  return ajax<CommentType[]>({
    url: `${MOCK_API_URL}/${ROUTES.COMMENTS}?${ROUTES.pVideoId}=${videoId}`,
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
      'api-key': MOCK_API_KEY,
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
