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
  commentId;
  private subscription: Subscription;

  constructor(
    private deleteCommentService: DeleteCommentService,
    private toast: ToastrService
  ) {}

  deleteSelectedComment(): void {
    this.subscription = this.deleteCommentService
      .deleteComment(this.commentId)
      .subscribe(() => this.toast.success('Comment deleted!'));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
