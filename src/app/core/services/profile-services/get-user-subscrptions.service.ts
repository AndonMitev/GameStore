import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';
//Action
import { GetUserSubscriptionsAction } from '../../../store/actions/user.actions';


@Injectable({
  providedIn: 'root'
})
export class GetUserSubscriptionsService {
  constructor(private method: GetMethod, private store: Store<AppState>) {}

  public getUserSubscriptions(userId: string): Observable<void> {
    return this.method
      .get<CompleteOrderModel[]>(
        `gamestore?query={"subscriptions":"${userId}"}`,
        'appdata'
      )
      .pipe(
        map((res: CompleteOrderModel[]) =>
          this.store.dispatch(new GetUserSubscriptionsAction(res))
        )
      );
  }
}
