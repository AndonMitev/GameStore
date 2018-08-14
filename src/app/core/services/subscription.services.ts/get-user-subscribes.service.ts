import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { SubscribeToGameModel } from '../../models/view-models/subscribe-to-game.model';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetAllUserSubscriptions } from '../../../store/actions/subscription.actions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUserSubscriptionsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}
  
  getUserSubscriptions(id) {
    return this.http
      .get(`subscriptions?query={"id":"${id}"}&sort={"_kmd.ect": -1}`, 'appdata')
      .pipe(
        map((res: SubscribeToGameModel[]) =>
          this.store.dispatch(new GetAllUserSubscriptions(res))
        ) 
      );
  }
}
