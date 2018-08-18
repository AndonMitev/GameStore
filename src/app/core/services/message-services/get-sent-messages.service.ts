import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map, tap } from 'rxjs/operators';
import { GetSentMessages } from '../../../store/actions/message.actions';
import { CreateMessageInputModel } from '../../models/input-models/message-model';

@Injectable({
  providedIn: 'root'
})
export class GetAllUserMessagesService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getSentMessages(userId: string) {
    return this.http
      .get(
        `messages?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`,
        'appdata'
      )
      .pipe(
        map((res: CreateMessageInputModel[]) =>
          this.store.dispatch(new GetSentMessages(res))
        )
      );
  }
}
