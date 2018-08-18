import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from 'rxjs/operators';
import { CreateMessageInputModel } from '../../models/input-models/message-model';
import { GetReceivedMessages } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class GetReceivedMessagesService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getReceivedMessages(SENDER_ID: string) {
    return this.http
      .get(
        `messages?query={"recepientId":"${SENDER_ID}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: CreateMessageInputModel[]) => {
          this.store.dispatch(new GetReceivedMessages(res));
        })
      );
  }
}
