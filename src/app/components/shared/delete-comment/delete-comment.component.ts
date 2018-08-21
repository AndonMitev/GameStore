import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription;

  constructor(
    private commentService: DeleteCommentService,
    private toast: ToastrService
  ) {}

  public deleteSelectedComment(): void {
    this.subscription = this.commentService
      .deleteComment(this.commentId)
      .subscribe(() => this.toast.success('Comment deleted!'));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
