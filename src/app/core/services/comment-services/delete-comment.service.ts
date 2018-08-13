import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

//Service
import { HttpServices } from '../http.services';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { DeleteComment } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class DeleteCommentService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  deleteComment(id) {
    return this.http
      .delete(`comments/${id}`, 'appdata')
      .pipe(map(() => this.store.dispatch(new DeleteComment(id))));
  }
}
