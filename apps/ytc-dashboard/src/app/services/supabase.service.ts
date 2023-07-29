import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';
import {
    Database,
    YTC_AUTH_KEYS,
    YTC_COMMENTS_RANDOM_COMMENTS_VIEW_NAME,
    YTC_COMMENTS_TABLE_NAME,
    YTC_COMMENTS_TYPE_TABLE_NAME,
    YtcAuthKeysModel,
    YtcCommentsModel,
    YtcCommentsTypeModel,
} from '../supabase';

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    private supabase: SupabaseClient<Database>;

    constructor() {
        this.supabase = createClient(
            'https://cnhqczyerdycpxztjyuh.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuaHFjenllcmR5Y3B4enRqeXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzU1MzcsImV4cCI6MjAwNDUxMTUzN30.l1GHmXjkm-f8McMFeZHHkFhAFAIddUUHV2XQ4y3h0kI',
        );
    }

    getCommentTypes(): Observable<YtcCommentsTypeModel[]> {
        return from(this.supabase.from(YTC_COMMENTS_TYPE_TABLE_NAME).select('*')).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.data;
            }),
        );
    }

    getCommentsCount(): Observable<number> {
        return from(this.supabase.from(YTC_COMMENTS_TABLE_NAME).select('*', { count: 'exact', head: true })).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.count || 0;
            }),
        );
    }

    getFilledCommentsCount(): Observable<number> {
        return from(
            this.supabase
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

    getOneUnfilledComments(): Observable<YtcCommentsModel> {
        return from(
            this.supabase
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

    updateCommentType(commentTypeId: number, currentCommentId: number): Observable<true> {
        return from(
            this.supabase.from(YTC_COMMENTS_TABLE_NAME).update({ type_id: commentTypeId }).eq('id', currentCommentId),
        ).pipe(
            map(result => {
                if (result.error) throw result.error;
                return true;
            }),
        );
    }

    getAuthKey(key: string): Observable<YtcAuthKeysModel> {
        return from(this.supabase.from(YTC_AUTH_KEYS).select().eq('key', key).single()).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.data;
            }),
        );
    }
}
