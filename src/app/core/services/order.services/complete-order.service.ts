import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//Services
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';
//Action
import { CompleteOrder } from '../../../store/actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class CompleteOrderService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  finishOrder(order): Observable<void> {
    console.log(order);

    return this.http.post(order, 'orders', 'appdata').pipe(
      map((res: CompleteOrderModel) => {
        this.store.dispatch(new CompleteOrder(order));
      })
    );
  }
}
