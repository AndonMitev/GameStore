import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

//Service
import { GetUserCommentsService } from '../../../core/services/comment-services/get-user-comments.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { AllCommentsGameModel } from '../../../core/models/view-models/all-comments-game.model';

@Component({
  selector: 'user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit, OnDestroy {
  public userComments$: Observable<AllCommentsGameModel[]>;
  public showSpinner: boolean;
  public currPage: number;
  public pageSize: number;
  private subscription: Subscription;

  constructor(
    private getUserComments: GetUserCommentsService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.currPage = 1;
    this.pageSize = 6;
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const USER_ID: string = res['params']['id'];

      this.getUserComments.getUserComments(USER_ID).subscribe(() => {
        this.userComments$ = this.store.pipe(
          select((state: AppState) => state.comments.all)
        );
        this.showSpinner = false;
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
