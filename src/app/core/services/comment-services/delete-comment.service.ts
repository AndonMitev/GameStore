import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//CRUD Method
import { DeleteMethod } from '../crud-methods/delete-method.service';
//State
import { AppState } from '../../../store/app.state';
//Action
import { DeleteCommentAction } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class DeleteCommentService {
  constructor(private method: DeleteMethod, private store: Store<AppState>) {}

  public deleteComment(id: string): Observable<void> {
    return this.method
      .delete<string>(`comments/${id}`, 'appdata')
      .pipe(map(() => this.store.dispatch(new DeleteCommentAction(id))));
  }
}
