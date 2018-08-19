import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { map } from '../../../../../node_modules/rxjs/operators';
import { DetailsGameModel } from '../../models/view-models/details-game.model';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetUserSubscriptions } from '../../../store/actions/user.actions';
import { Observable } from '../../../../../node_modules/rxjs';
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserSubscriptionsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getUserSubscriptions(userId: string): Observable<void> {
    return this.http
      .get<CompleteOrderModel[]>(
        `gamestore?query={"subscriptions":"${userId}"}`,
        'appdata'
      )
      .pipe(
        map((res: CompleteOrderModel[]) =>
          this.store.dispatch(new GetUserSubscriptions(res))
        )
      );
  }
}
