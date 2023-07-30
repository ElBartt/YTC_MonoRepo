import { Database } from './supabase';
import { SupabaseHelpers } from '../supabase-helpers';

export const YTC_COMMENTS_TYPE_TABLE_NAME: string =
    SupabaseHelpers.extractStringKey<Database['public']['Tables']>('ytc_comments_type');
export const YTC_COMMENTS_TABLE_NAME: string =
    SupabaseHelpers.extractStringKey<Database['public']['Tables']>('ytc_comments');
export const YTC_AUTH_KEYS: string = SupabaseHelpers.extractStringKey<Database['public']['Tables']>('ytc_auth_keys');
export const YTC_COMMENTS_RANDOM_COMMENTS_VIEW_NAME: string =
    SupabaseHelpers.extractStringKey<Database['public']['Views']>('random_ytc_comments');

export type YtcCommentsTypeModel = Database['public']['Tables']['ytc_comments_type']['Row'];
export type YtcCommentsModel = Database['public']['Tables']['ytc_comments']['Row'];
export type YtcAuthKeysModel = Database['public']['Tables']['ytc_auth_keys']['Row'];
