import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { AllCommentsGameModel } from '../../models/view-models/all-comments-game.model';
//Action
import { GetAllCommentsAction } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class GetAllCommentsService {
  constructor(private method: GetMethod, private store: Store<AppState>) {}

  public getAllComments(gameId: string): Observable<void> {
    return this.method
      .get<AllCommentsGameModel[]>(
        `comments?query={"id":"${gameId}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: AllCommentsGameModel[]) =>
          this.store.dispatch(new GetAllCommentsAction(res))
        )
      );
  }
}
