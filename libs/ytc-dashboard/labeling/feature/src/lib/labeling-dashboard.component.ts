import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CommentsService } from '@ytc/ytc-dashboard/labeling/data-access';
import { YtcCommentsModel, YtcCommentsTypeModel } from '@ytc/ytc-dashboard/shared/supabase/util';

@Component({
    selector: 'ytc-labeling-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './labeling-dashboard.component.html',
})
export class LabelingDashboardComponent implements OnInit {
    private readonly commentsService = inject(CommentsService);
    public isLoading = false;
    public unfilledComment$!: Observable<YtcCommentsModel>;
    public commentTypes!: YtcCommentsTypeModel[];
    public commentsCount!: number | null;
    public filledCommentsCount!: number | null;

    ngOnInit(): void {
        this.commentsService.getCommentsCount().subscribe(count => (this.commentsCount = count));
        this.commentsService.getFilledCommentsCount().subscribe(count => (this.filledCommentsCount = count));

        this.unfilledComment$ = this.commentsService.getOneUnfilledComments().pipe(
            tap(() => (this.isLoading = true)),
            map((comment: YtcCommentsModel) => {
                return { ...comment, id: comment.id, comment_text: comment.comment_text };
            }),
            tap(() => (this.isLoading = false)),
        );

        this.commentsService
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
        this.commentsService.updateCommentType(commentTypeId, currentCommentId).subscribe(() => {
            this.unfilledComment$ = this.commentsService.getOneUnfilledComments().pipe(
                map((comment: YtcCommentsModel) => {
                    this.isLoading = false;
                    return { ...comment, id: comment.id, comment_text: comment.comment_text };
                }),
            );
        });
        this.commentsService.getFilledCommentsCount().subscribe(count => (this.filledCommentsCount = count));
    }
}
