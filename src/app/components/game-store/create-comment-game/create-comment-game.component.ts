import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
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

  public ngOnInit(): void {
    this.initializeCommentForm();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public initializeCommentForm(): void {
    this.commentForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  public submitCommentForm(): void {
    this.subscription = this.actRouter.paramMap.subscribe((res: ParamMap) => {
      const ID: string = res['params']['id'];
      const DESCRIPTION: string = this.commentForm.value['description'];
      const AUTHOR: string = localStorage.getItem('username');

      this.commentModel = new CommentGameInputModel(ID, DESCRIPTION, AUTHOR);
      this.commentService.createComment(this.commentModel).subscribe(() => {
        this.toast.success(`Comment successfully created!`);
        this.initializeCommentForm();
      });
    });
  }

  public get description(): AbstractControl {
    return this.commentForm.get('description');
  }
}
