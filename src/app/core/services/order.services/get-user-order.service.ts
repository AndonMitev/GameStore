import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  GetCompletedOrder,
  CompleteOrder
} from '../../../store/actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class GetCompletedOrdersService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getCompletedOrders(id: string) {
    return this.http
      .get(`orders?query={"userId":"${id}"}&sort={"_kmd.ect": -1}`, 'appdata')
      .pipe(
        map((res: CompleteOrder[]) => {
          this.store.dispatch(new GetCompletedOrder(res));
        })
      );
  }
}
