import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GetUserCommentsService } from '../../../core/services/comment-services/get-user-comments.service';
import { AppState } from '../../../store/app.state';

import { AllCommentsGameModel } from '../../../core/models/view-models/all-comments-game.model';

@Component({
  selector: 'user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {
  public userComments$: Observable<AllCommentsGameModel[]>;
  public showSpinner: boolean;

  constructor(
    private getUserComments: GetUserCommentsService,
    private store: Store<AppState>
  ) {
    this.showSpinner = true;
  }

  ngOnInit() {
    const USER_ID = localStorage.getItem('userId');
    this.getUserComments.getUserComments(USER_ID).subscribe(() => {
      this.userComments$ = this.store.pipe(select(state => state.comments.all));
      this.showSpinner = false;
    });
  }
}
