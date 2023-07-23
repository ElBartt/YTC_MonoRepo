import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { Database } from '../supabase';

export type CommentsTypesType = {
    id: number;
    comment_type: string;
};

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient<Database>(
            'https://cnhqczyerdycpxztjyuh.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuaHFjenllcmR5Y3B4enRqeXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzU1MzcsImV4cCI6MjAwNDUxMTUzN30.l1GHmXjkm-f8McMFeZHHkFhAFAIddUUHV2XQ4y3h0kI',
        );
    }

    getCommentTypes() {
        return from(this.supabase.from('ytc_comments_type').select());
    }

    getOneUnfilledComments() {
        return from(this.supabase.from('ytc_comments').select().limit(1).eq('type_id', 0));
    }

    updateCommentType(commentTypeId: number, currentCommentId: number) {
        return from(this.supabase.from('ytc_comments').update({ type_id: commentTypeId }).eq('id', currentCommentId));
    }
}
