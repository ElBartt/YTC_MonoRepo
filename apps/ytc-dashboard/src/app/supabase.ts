export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            ytc_comments: {
                Row: {
                    comment_text: string | null;
                    created_at: string | null;
                    id: number;
                    type_id: number | null;
                };
                Insert: {
                    comment_text?: string | null;
                    created_at?: string | null;
                    id?: number;
                    type_id?: number | null;
                };
                Update: {
                    comment_text?: string | null;
                    created_at?: string | null;
                    id?: number;
                    type_id?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'ytc_comments_type_id_fkey';
                        columns: ['type_id'];
                        referencedRelation: 'ytc_comments_type';
                        referencedColumns: ['id'];
                    },
                ];
            };
            ytc_comments_type: {
                Row: {
                    comment_type: string;
                    id: number;
                };
                Insert: {
                    comment_type: string;
                    id?: number;
                };
                Update: {
                    comment_type?: string;
                    id?: number;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
