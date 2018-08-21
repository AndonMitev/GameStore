import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//Service
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Action
import { DeleteComment } from '../../../store/actions/comment.actions';

@Injectable({
  providedIn: 'root'
})
export class DeleteCommentService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  public deleteComment(id: string): Observable<void> {
    return this.http
      .delete<string>(`comments/${id}`, 'appdata')
      .pipe(map(() => this.store.dispatch(new DeleteComment(id))));
  }
}
