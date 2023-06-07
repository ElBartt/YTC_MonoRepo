import { MOCK_API_URL } from '@org/shared/mock-backend/utils';
import { UserSchema, UserType } from '@org/shared/users/util';
import { catchError, map, Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HTTP_METHOD, ROUTES } from '@org/shared/ytc-front/routes/util';

export function getUser(apiKey: string): Observable<UserType> {
  return ajax<UserType>({
    url: `${MOCK_API_URL}/${ROUTES.USERS}?${ROUTES.pApiKey}=${apiKey}`,
    method: HTTP_METHOD.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  }).pipe(
    map(({ response }: AjaxResponse<UserType>) => UserSchema.parse(response)),
    catchError(error => {
      return of(error.response);
    }),
  );
}
