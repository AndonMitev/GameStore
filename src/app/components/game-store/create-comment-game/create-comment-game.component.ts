import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

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
  public isClicked: boolean;
  public buttonText: string;
  private commentModel: CommentGameInputModel;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private actRouter: ActivatedRoute,
    private commentService: CreateCommentGameService,
    private toast: ToastrService
  ) {
    this.isClicked = false;
    this.buttonText = 'Comment';
  }

  public ngOnInit(): void {
  
    this.initializeCommentForm();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public initializeCommentForm(): void {
    this.commentForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(256)]]
    });
  }

  public submitCommentForm(): void {
    this.isClicked = true;
    this.buttonText = 'Processing...';

    this.actRouter.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const ID: string = res['params']['id'];
        const DESCRIPTION: string = this.commentForm.value['description'];
        const AUTHOR: string = localStorage.getItem('username');

        this.commentModel = new CommentGameInputModel(ID, DESCRIPTION, AUTHOR);
        this.commentService.createComment(this.commentModel)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.toast.success(`Comment successfully created!`);
            this.isClicked = false;
            this.buttonText = 'Comment';
            this.initializeCommentForm();
        });
    });
  }

  public get description(): AbstractControl {
    return this.commentForm.get('description');
  }
}
