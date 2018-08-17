import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { HttpServices } from '../http.services';
import { AppState } from '../../../store/app.state';
import { CreateMessageInputModel } from '../../models/input-models/message-model';
import { map } from '../../../../../node_modules/rxjs/operators';
import { CreateMessage } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class CreateMessageService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  createNewMessage(message: CreateMessageInputModel) {
    return this.http
      .post(message, 'messages', 'appdata')
      .pipe(map(() => this.store.dispatch(new CreateMessage(message))));
  }
}
