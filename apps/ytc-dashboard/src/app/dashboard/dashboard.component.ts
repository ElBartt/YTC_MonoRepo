import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SupabaseService } from '../services/supabase.service';
import { YtcCommentsModel, YtcCommentsTypeModel } from '../supabase';

@Component({
    selector: 'ytc-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    private readonly supabaseService = inject(SupabaseService);
    public isLoading = false;
    public unfilledComment$!: Observable<YtcCommentsModel>;
    public commentTypes!: YtcCommentsTypeModel[];
    public commentsCount!: number | null;
    public filledCommentsCount!: number | null;

    ngOnInit(): void {
        this.supabaseService.getCommentsCount().subscribe(count => (this.commentsCount = count));
        this.supabaseService.getFilledCommentsCount().subscribe(count => (this.filledCommentsCount = count));

        this.unfilledComment$ = this.supabaseService.getOneUnfilledComments().pipe(
            tap(() => (this.isLoading = true)),
            map((comment: YtcCommentsModel) => {
                return { ...comment, id: comment.id, comment_text: comment.comment_text };
            }),
            tap(() => (this.isLoading = false)),
        );

        this.supabaseService
            .getCommentTypes()
            .pipe(
                tap(() => (this.isLoading = true)),
                map((res: YtcCommentsTypeModel[]) =>
                    res
                        .filter((line: YtcCommentsTypeModel) => line.id > 0)
                        .map((line: YtcCommentsTypeModel) => ({ id: line.id, comment_type: line.comment_type })),
                ),
                tap(() => (this.isLoading = false)),
            )
            .subscribe(res => (this.commentTypes = res));
    }

    assignCategory(commentTypeId: number, currentCommentId: number) {
        this.isLoading = true;
        this.supabaseService.updateCommentType(commentTypeId, currentCommentId).subscribe(() => {
            this.unfilledComment$ = this.supabaseService.getOneUnfilledComments().pipe(
                map((comment: YtcCommentsModel) => {
                    this.isLoading = false;
                    return { ...comment, id: comment.id, comment_text: comment.comment_text };
                }),
            );
        });
        this.supabaseService.getFilledCommentsCount().subscribe(count => (this.filledCommentsCount = count));
    }
}
