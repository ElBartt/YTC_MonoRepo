export class SupabaseHelpers {
    public static extractStringKey<T extends Record<string, unknown>>(key: keyof T & string): string {
        return key;
    }
}
