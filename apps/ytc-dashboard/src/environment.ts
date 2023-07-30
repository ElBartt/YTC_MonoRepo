import { Database } from '@ytc/ytc-dashboard/shared/supabase/util';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient<Database>(
    'https://cnhqczyerdycpxztjyuh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuaHFjenllcmR5Y3B4enRqeXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzU1MzcsImV4cCI6MjAwNDUxMTUzN30.l1GHmXjkm-f8McMFeZHHkFhAFAIddUUHV2XQ4y3h0kI',
);
