import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//Service
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../models/input-models/message-model';
//Action
import { GetSentMessages } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class GetAllUserMessagesService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  public getSentMessages(userId: string): Observable<void> {
    return this.http
      .get<CreateMessageInputModel[]>(
        `messages?query={"fromId":"${userId}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: CreateMessageInputModel[]) =>
          this.store.dispatch(new GetSentMessages(res))
        )
      );
  }
}
