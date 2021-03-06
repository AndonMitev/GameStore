import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../models/input-models/message-model';
//Action
import { GetReceivedMessagesAction } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class GetReceivedMessagesService {
  constructor(private method: GetMethod, private store: Store<AppState>) {}

  public getReceivedMessages(SENDER_ID: string): Observable<void> {
    return this.method
      .get<CreateMessageInputModel[]>(
        `messages?query={"recepientId":"${SENDER_ID}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: CreateMessageInputModel[]) => {
          this.store.dispatch(new GetReceivedMessagesAction(res));
        })
      );
  }
}
