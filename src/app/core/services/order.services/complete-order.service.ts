import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../../node_modules/rxjs';

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

  finishOrder(order): Observable<object> {
    return this.http.post(order, 'orders', 'appdata');
  }
}
