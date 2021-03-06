import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../models/input-models/message-model';
//Action
import { CreateMessageAction } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class CreateMessageService {
  constructor(private method: PostMethod, private store: Store<AppState>) {}

  createMessage(message: CreateMessageInputModel): Observable<void> {
    return this.method
      .post<CreateMessageInputModel>(message, 'messages', 'appdata')
      .pipe(
        map((res: CreateMessageInputModel) => {
          this.store.dispatch(new CreateMessageAction(res));
        })
      );
  }
}
