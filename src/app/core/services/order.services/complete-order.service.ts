import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';
//Action
import { CompleteOrderAction } from '../../../store/actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class CompleteOrderService {
  constructor(private method: PostMethod, private store: Store<AppState>) {}

  public finishOrder(order): Observable<void> {
    return this.method.post(order, 'orders', 'appdata').pipe(
      map((res: CompleteOrderModel) => {
        this.store.dispatch(new CompleteOrderAction(order));
      })
    );
  }
}
