import { MOCK_API_KEY, MOCK_API_URL } from '@org/shared/mock-backend/utils';
import { CommentSchema, CommentType } from '@org/ytc-front/shared/comment/utils';
import { Observable, map } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

// TODO: Move theses variables to a better place
const videoId = '6nFlKS-15X8';

export function getCommentList(): Observable<CommentType[]> {
  return ajax<CommentType[]>({
    url: `${MOCK_API_URL}/comments?videoId=${videoId}`,
    method: 'GET',
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
