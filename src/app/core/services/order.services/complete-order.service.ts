import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

//Services
import { HttpServices } from '../http.services';
//AppModel
import { AppState } from '../../../store/app.state';
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';
import { map } from 'rxjs/operators';
import { CompleteOrder } from '../../../store/actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class CompleteOrderService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  finishOrder(order) {
    return this.http.post(order, 'orders', 'appdata');
  }
}

/* .pipe(
        map((res: CompleteOrderModel[]) => {
          this.store.dispatch(new CompleteOrder(res))
        })
      )*/
