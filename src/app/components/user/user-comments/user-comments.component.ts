import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { GetUserCommentsService } from '../../../core/services/comment-services/get-user-comments.service';
import { AppState } from '../../../store/app.state';

import { AllCommentsGameModel } from '../../../core/models/view-models/all-comments-game.model';

@Component({
  selector: 'user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit, OnDestroy {
  public userComments$: Observable<AllCommentsGameModel[]>;
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    private getUserComments: GetUserCommentsService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.showSpinner = true;
  }

  ngOnInit() {
    this.subscription = this.actRoute.paramMap.subscribe(res => {
      const USER_ID = res['params']['id'];
      this.getUserComments.getUserComments(USER_ID).subscribe(() => {
        this.userComments$ = this.store.pipe(
          select(state => state.comments.all)
        );
        this.showSpinner = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
