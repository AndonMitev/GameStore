import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { SubscribeToGameModel } from '../../models/view-models/subscribe-to-game.model';
import { SubscribeToGame } from '../../../store/actions/subscription.actions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscribeToGameService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  subscribeUser(game) {
    return this.http.post(game, 'subscriptions', 'appdata').pipe(
      map((res: SubscribeToGameModel) => {
        this.store.dispatch(new SubscribeToGame(res));
        console.log('here');
      })
    );
  }
}
