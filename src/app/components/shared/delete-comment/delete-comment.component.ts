import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

import { ToastrService } from 'ngx-toastr';
import { DeleteCommentService } from '../../../core/services/comment-services/delete-comment.service';

@Component({
  selector: 'delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnDestroy {
  @Input()
  public commentId: string;
  public buttonText: string;
  public isClicked: boolean;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private commentService: DeleteCommentService,
    private toast: ToastrService
  ) {
    this.isClicked = false;
    this.buttonText = 'Delete';
  }

  public deleteSelectedComment(): void {
    this.isClicked = true;
    this.buttonText = 'Processing...';

    this.commentService
      .deleteComment(this.commentId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.isClicked = false;
        this.buttonText = 'Delete';
        this.toast.success('Comment deleted!');
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
