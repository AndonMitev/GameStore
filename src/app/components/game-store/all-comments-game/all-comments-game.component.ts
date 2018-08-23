import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

//Service
import { GetAllCommentsService } from '../../../core/services/comment-services/get-all-comments-game.service';
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';
//Model
import { AllCommentsGameModel } from '../../../core/models/view-models/all-comments-game.model';
//State
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'all-comments-game',
  templateUrl: './all-comments-game.component.html',
  styleUrls: ['./all-comments-game.component.css']
})
export class AllCommentsGameComponent implements OnInit, OnDestroy {
  public allComments$: Observable<AllCommentsGameModel[]>;
  public showSpinner: boolean;
  public currPage: number;
  public pageSize: number;
  public currentUserId: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public verification: UserVerificationService,
    private router: ActivatedRoute,
    private store: Store<AppState>,
    private commentService: GetAllCommentsService
  ) {
    this.currPage = 1;
    this.pageSize = 6;
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.router.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const GAME_ID: string = res['params']['id'];

        this.commentService
          .getAllComments(GAME_ID)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.allComments$ = this.store.pipe(
              select((state: AppState) => state.comments.all),
              takeUntil(this.ngUnsubscribe)
            );
            this.currentUserId = localStorage.getItem('userId');
            this.showSpinner = false;
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
