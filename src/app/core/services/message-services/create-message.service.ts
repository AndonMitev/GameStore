import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Service
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../models/input-models/message-model';
//Action
import { CreateMessage } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class CreateMessageService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  createNewMessage(message: CreateMessageInputModel): Observable<void> {
    return this.http
      .post<CreateMessageInputModel>(message, 'messages', 'appdata')
      .pipe(map(() => this.store.dispatch(new CreateMessage(message))));
  }
}
