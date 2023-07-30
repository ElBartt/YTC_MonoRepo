import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@ytc/ytc-dashboard/shared/supabase/util';

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    public supabaseClient: SupabaseClient<Database>;

    constructor() {
        this.supabaseClient = createClient(
            'https://cnhqczyerdycpxztjyuh.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuaHFjenllcmR5Y3B4enRqeXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzU1MzcsImV4cCI6MjAwNDUxMTUzN30.l1GHmXjkm-f8McMFeZHHkFhAFAIddUUHV2XQ4y3h0kI',
        );
    }
}
