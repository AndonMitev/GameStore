import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { AllCommentsGameModel } from '../../models/view-models/all-comments-game.model';
import { GetUserComments } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class GetUserCommentsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getUserComments(userId) {
    return this.http
      .get(
        `comments?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: AllCommentsGameModel[]) =>
          this.store.dispatch(new GetUserComments(res))
        )
      );
  }
}
