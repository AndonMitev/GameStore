import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CommentGameInputModel } from '../../models/input-models/create-comment-game.model';
//Action
import { AddCommentAction } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class CreateCommentGameService {
  constructor(private http: PostMethod, private store: Store<AppState>) {}

  public createComment(comment: CommentGameInputModel): Observable<void> {
    return this.http
      .post<CommentGameInputModel>(comment, 'comments', 'appdata')
      .pipe(
        map((res: CommentGameInputModel) => {
          this.store.dispatch(new AddCommentAction(res));
        })
      );
  }
}
