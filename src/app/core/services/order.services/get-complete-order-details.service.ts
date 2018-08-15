import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from 'rxjs/operators';
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';
import { GetCompletedOrderDetails } from '../../../store/actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class GetCompletedOrderDetailsService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getCompletedOrderDetails(id) {
    return this.http.get(`orders/${id}`, 'appdata').pipe(
      map((res: CompleteOrderModel) => {
        this.store.dispatch(new GetCompletedOrderDetails(res));
      })
    );
  }
}
