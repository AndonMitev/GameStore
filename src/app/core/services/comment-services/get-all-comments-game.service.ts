import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

//Services
import { HttpServices } from '../http.services';
//Comments
import { AllCommentsGameModel } from '../../models/view-models/all-comments-game.model';
//State
import { AppState } from '../../../store/app.state';
import { GetAllComments } from '../../../store/actions/comment.actions';
//Action
//import { GetCommentsGame } from '../../../store/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GetAllCommentsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getAllComments(gameId: string) {
    return this.http
      .get<AllCommentsGameModel[]>(
        `comments?query={"id":"${gameId}"}&sort={"_kmd.ect": -1}`,
        'appdata'
        //
      )
      .pipe(
        map((res: AllCommentsGameModel[]) =>
          this.store.dispatch(new GetAllComments(res))
        )
      );
  }
}
