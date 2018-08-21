import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//CRUD Method
import { PutMethod } from '../crud-methods/put-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateGameInputModel } from '../../models/input-models/create-game.model';
//Action
import { SubscribeUserAction } from '../../../store/actions/game.actions';
import { UnsubscribeUserAction } from '../../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: PutMethod, private store: Store<AppState>) {}

  public subscriptionGame(game: CreateGameInputModel, id: string): Observable<void> {
    return this.http.put(game, `gamestore/${id}`, 'appdata').pipe(
      map((res: CreateGameInputModel) => {
        this.store.dispatch(new SubscribeUserAction(res));
        this.store.dispatch(new UnsubscribeUserAction(id));
      })
    );
  }
}
