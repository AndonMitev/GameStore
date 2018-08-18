import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from 'rxjs/operators';
import { GetMessageDetails } from '../../../store/actions/message.actions';
import { CreateMessageInputModel } from '../../models/input-models/message-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetMessageDetailsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getMessageDetails(id: string): Observable<void> {
    return this.http
      .get(`messages/${id}`, 'appdata')
      .pipe(
        map((res: CreateMessageInputModel) =>
          this.store.dispatch(new GetMessageDetails(res))
        )
      );
  }
}
