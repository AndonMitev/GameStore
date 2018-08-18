import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//Services
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { AllCommentsGameModel } from '../../models/view-models/all-comments-game.model';
//Action
import { GetAllComments } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class GetAllCommentsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getAllComments(gameId: string): Observable<void> {
    return this.http
      .get<AllCommentsGameModel[]>(
        `comments?query={"id":"${gameId}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: AllCommentsGameModel[]) =>
          this.store.dispatch(new GetAllComments(res))
        )
      );
  }
}
