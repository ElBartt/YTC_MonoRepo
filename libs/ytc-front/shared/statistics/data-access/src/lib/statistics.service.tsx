import { SourceType, StatisticsSchema, StatisticsType } from '@ytc/shared/models/util';
import { HTTP_METHOD, ROUTES } from '@ytc/shared/ytc-front/routes/util';
import { Observable, of } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';

export function getStatistics(sourceId: string, sourceType: SourceType, apiKey: string): Observable<StatisticsType> {
    return ajax<StatisticsType>({
        url: `${import.meta.env.VITE_APP_BACK_END_URL}/${ROUTES.STATS}?${sourceType}=${sourceId}`,
        method: HTTP_METHOD.GET,
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        },
    }).pipe(
        map(({ response }: AjaxResponse<StatisticsType>) => StatisticsSchema.parse(response)),
        catchError(error => {
            return of(error.response);
        }),
    );
}
