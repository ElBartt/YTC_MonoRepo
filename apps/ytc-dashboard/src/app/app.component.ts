import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { CommonModule } from '@angular/common';
import { map, Observable, tap } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'ytc-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    private readonly supabaseService = inject(SupabaseService);
    public isLoading = false;
    public unfilledComment$!: Observable<any>;
    public commentTypes!: any;

    ngOnInit(): void {
        this.unfilledComment$ = this.supabaseService.getOneUnfilledComments().pipe(
            tap(() => (this.isLoading = true)),
            map((res: any) => {
                return { id: res['data'][0].id, comment_text: res['data'][0].comment_text };
            }),
            tap(() => (this.isLoading = false)),
        );

        this.supabaseService
            .getCommentTypes()
            .pipe(
                tap(() => (this.isLoading = true)),
                map((res: any) => {
                    return res['data'].map((line: any) => {
                        return line.id > 0 ? { id: line.id, comment_type: line.comment_type } : undefined;
                    });
                }),
                map((res: any) => {
                    return res.filter((line: any) => line !== undefined);
                }),
                tap(() => (this.isLoading = false)),
            )
            .subscribe(res => (this.commentTypes = res));
    }

    assignCategory(commentTypeId: number, currentCommentId: number) {
        this.isLoading = true;
        this.supabaseService.updateCommentType(commentTypeId, currentCommentId).subscribe(res => {
            this.unfilledComment$ = this.supabaseService.getOneUnfilledComments().pipe(
                map((res: any) => {
                    this.isLoading = false;
                    return { id: res['data'][0].id, comment_text: res['data'][0].comment_text };
                }),
            );
        });
    }
}
