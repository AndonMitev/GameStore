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
import { GetReceivedMessages } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class GetReceivedMessagesService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  public getReceivedMessages(SENDER_ID: string): Observable<void> {
    return this.http
      .get<CreateMessageInputModel[]>(
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
