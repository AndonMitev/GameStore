import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { AllCommentsGameModel } from '../../models/view-models/all-comments-game.model';
//Action
import { GetUserCommentsAction } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class GetUserCommentsService {
  constructor(private http: GetMethod, private store: Store<AppState>) {}

  public getUserComments(userId: string): Observable<void> {
    return this.http
      .get<AllCommentsGameModel[]>(
        `comments?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: AllCommentsGameModel[]) =>
          this.store.dispatch(new GetUserCommentsAction(res))
        )
      );
  }
}
