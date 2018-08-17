import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from '../../../../../node_modules/rxjs/operators';
import { GetAllMessages } from '../../../store/actions/message.actions';
import { CreateMessageInputModel } from '../../models/input-models/message-model';

@Injectable({
  providedIn: 'root'
})
export class GetAllUserMessagesService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getAllUserMessages(username: string) {
    return this.http
      .get(
        `messages?query={"recipient":"${username}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: CreateMessageInputModel[]) =>
          this.store.dispatch(new GetAllMessages(res))
        )
      );
  }
}
