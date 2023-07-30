import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '@ytc/ytc-dashboard/shared/supabase/data-access';
import { from, map, Observable } from 'rxjs';
import { YTC_AUTH_KEYS, YtcAuthKeysModel } from '@ytc/ytc-dashboard/shared/supabase/util';

@Injectable()
export class AuthKeyService {
    private readonly supabaseService: SupabaseService = inject(SupabaseService);

    public getAuthKey(key: string): Observable<YtcAuthKeysModel> {
        return from(this.supabaseService.supabaseClient.from(YTC_AUTH_KEYS).select().eq('key', key).single()).pipe(
            map(result => {
                if (result.error) throw result.error;
                return result.data;
            }),
        );
    }
}
