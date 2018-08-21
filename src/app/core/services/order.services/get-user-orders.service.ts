import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';
//Action
import { GetCompletedOrdersAction } from '../../../store/actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class GetCompletedOrdersService {
  constructor(private http: GetMethod, private store: Store<AppState>) {}

  public getCompletedOrders(id: string): Observable<void> {
    return this.http
      .get<CompleteOrderModel[]>(`orders?query={"userId":"${id}"}&sort={"_kmd.ect": -1}`, 'appdata')
      .pipe(
        map((res: CompleteOrderModel[]) => {
          this.store.dispatch(new GetCompletedOrdersAction(res));
        })
      );
  }
}
