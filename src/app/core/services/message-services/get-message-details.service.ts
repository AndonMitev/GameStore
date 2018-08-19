import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//Services
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../models/input-models/message-model';
//Action
import { GetMessageDetails } from '../../../store/actions/message.actions';

@Injectable({
  providedIn: 'root'
})
export class GetMessageDetailsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getMessageDetails(id: string): Observable<void> {
    return this.http
      .get<CreateMessageInputModel>(`messages/${id}`, 'appdata')
      .pipe(
        map((res: CreateMessageInputModel) =>
          this.store.dispatch(new GetMessageDetails(res))
        )
      );
  }
}