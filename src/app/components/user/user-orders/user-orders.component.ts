import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetCompletedOrdersService } from '../../../core/services/order.services/get-user-orders.service';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  private orders$;

  constructor(
    private store: Store<AppState>,
    private orderService: GetCompletedOrdersService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.orderService.getCompletedOrders(userId).subscribe(res => {
      this.orders$ = this.store.pipe(
        select(state => state.orders.completedOrders)
      );
    });
  }
}
