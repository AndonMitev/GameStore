import { Injectable } from '@angular/core';

//CRUD Method
import { DeleteMethod } from '../crud-methods/delete-method.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CancelMyCompletedOrderAction } from '../../../store/actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class CancelMyOrderService {
  constructor(private method: DeleteMethod, private store: Store<AppState>) {}

  cancelMyOrder(id: string): Observable<void> {
    return this.method
      .delete(`orders/${id}`, 'appdata')
      .pipe(
        map(() => this.store.dispatch(new CancelMyCompletedOrderAction(id)))
      );
  }
}
