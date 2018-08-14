import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  GetCompletedOrders,
  CompleteOrder
} from '../../../store/actions/order.actions';
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';

@Injectable({
  providedIn: 'root'
})
export class GetCompletedOrdersService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getCompletedOrders(id: string) {
    return this.http
      .get(`orders?query={"userId":"${id}"}&sort={"_kmd.ect": -1}`, 'appdata')
      .pipe(
        map((res: CompleteOrderModel[]) => {
          this.store.dispatch(new GetCompletedOrders(res));
        })
      );
  }
}
