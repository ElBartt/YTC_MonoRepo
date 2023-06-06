import { UserSchema, UserType } from '@org/shared/users/util';
import { MOCK_API_URL } from '@org/shared/mock-backend/utils';
import { Observable, catchError, map, of } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

export function getUser(apiKey: string): Observable<UserType> {
  return ajax<UserType>({
    url: `${MOCK_API_URL}/users?apikey=${apiKey}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).pipe(
    map(({ response }: AjaxResponse<UserType>) => {
      console.log('MAP response', response);
      return UserSchema.parse(response);
    }),
    catchError(error => {
      return of(error.response);
    }),
  );
}
