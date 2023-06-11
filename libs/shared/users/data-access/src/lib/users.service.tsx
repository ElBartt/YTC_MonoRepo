import { UserSchema, UserType } from '@ytc/shared/models/util';
import { catchError, map, Observable, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HTTP_METHOD, ROUTES } from '@ytc/shared/ytc-front/routes/util';

export function getUser(apiKey: string): Observable<UserType> {
    return ajax<UserType>({
        url: `${import.meta.env.VITE_APP_BACK_END_URL}/${ROUTES.USERS}?${ROUTES.pApiKey}=${apiKey}`,
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
