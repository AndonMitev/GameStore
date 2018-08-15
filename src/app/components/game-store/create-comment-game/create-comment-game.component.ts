import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

//Model
import { CommentGameInputModel } from '../../../core/models/input-models/create-comment-game.model';
//Service
import { CreateCommentGameService } from '../../../core/services/comment-services/create-comment.service';

@Component({
  selector: 'create-comment-game',
  templateUrl: './create-comment-game.component.html',
  styleUrls: ['./create-comment-game.component.css']
})
export class CreateCommentGameComponent implements OnInit, OnDestroy {
  public commentForm: FormGroup;
  private commentModel: CommentGameInputModel;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private actRouter: ActivatedRoute,
    private commentService: CreateCommentGameService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.initializeCommentForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initializeCommentForm() {
    this.commentForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  submitCommentForm() {
    this.subscription = this.actRouter.paramMap.subscribe(res => {
      const ID = res['params']['id'];
      const DESCRIPTION = this.commentForm.value['description'];
      const AUTHOR = localStorage.getItem('username');

      this.commentModel = new CommentGameInputModel(ID, DESCRIPTION, AUTHOR);
      this.commentService.createComment(this.commentModel).subscribe(() => {
        this.toast.success(`Comment successfully created!`);
      });
    });
  }

  get description() {
    return this.commentForm.get('description');
  }
}
