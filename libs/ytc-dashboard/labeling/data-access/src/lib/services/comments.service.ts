import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '@ytc/ytc-dashboard/shared/supabase/data-access';
import { from, map, Observable } from 'rxjs';
import {
    YTC_COMMENTS_RANDOM_COMMENTS_VIEW_NAME,
    YTC_COMMENTS_TABLE_NAME,
    YTC_COMMENTS_TYPE_TABLE_NAME,
    YtcCommentsModel,
    YtcCommentsTypeModel,
} from '@ytc/ytc-dashboard/shared/supabase/util';

@Injectable()
export class CommentsService {
    private readonly supabaseService: SupabaseService = inject(SupabaseService);

    public getCommentTypes(): Observable<YtcCommentsTypeModel[]> {
        return from(this.supabaseService.supabaseClient.from(YTC_COMMENTS_TYPE_TABLE_NAME).select('*')).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.data;
            }),
        );
    }

    public getCommentsCount(): Observable<number> {
        return from(
            this.supabaseService.supabaseClient
                .from(YTC_COMMENTS_TABLE_NAME)
                .select('*', { count: 'exact', head: true }),
        ).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.count || 0;
            }),
        );
    }

    public getFilledCommentsCount(): Observable<number> {
        return from(
            this.supabaseService.supabaseClient
                .from(YTC_COMMENTS_TABLE_NAME)
                .select('*', { count: 'exact', head: true })
                .or('type_id.neq.0,type_id.not.is.NULL'),
        ).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.count || 0;
            }),
        );
    }

    public getOneUnfilledComments(): Observable<YtcCommentsModel> {
        return from(
            this.supabaseService.supabaseClient
                .from(YTC_COMMENTS_RANDOM_COMMENTS_VIEW_NAME)
                .select('*')
                .limit(1)
                .or('type_id.eq.0,type_id.is.NULL')
                .maybeSingle(),
        ).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.data;
            }),
        );
    }

    public updateCommentType(commentTypeId: number, currentCommentId: number): Observable<true> {
        return from(
            this.supabaseService.supabaseClient
                .from(YTC_COMMENTS_TABLE_NAME)
                .update({ type_id: commentTypeId })
                .eq('id', currentCommentId),
        ).pipe(
            map(result => {
                if (result.error) throw result.error;
                return true;
            }),
        );
    }
}
