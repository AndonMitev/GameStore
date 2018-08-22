import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../models/input-models/message-model';
//Action
import { GetSentMessagesAction } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class GetAllUserMessagesService {
  constructor(private http: GetMethod, private store: Store<AppState>) {}

  public getSentMessages(userId: string): Observable<void> {
    return this.http
      .get<CreateMessageInputModel[]>(
        `messages?query={"fromId":"${userId}"}`,
        'appdata'
      )
      .pipe(
        map((res: CreateMessageInputModel[]) =>
          this.store.dispatch(new GetSentMessagesAction(res))
        )
      );
  }
}
