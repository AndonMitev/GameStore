import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

//Services
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CommentGameInputModel } from '../../models/input-models/create-comment-game.model';
//Action
import { AddComment } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class CreateCommentGameService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  createComment(comment: CommentGameInputModel): Observable<void> {
    return this.http
      .post<CommentGameInputModel>(comment, 'comments', 'appdata')
      .pipe(
        map((res: CommentGameInputModel) => {
          this.store.dispatch(new AddComment(res));
        })
      );
  }
}
