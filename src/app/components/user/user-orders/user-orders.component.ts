import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetCompletedOrdersService } from '../../../core/services/order.services/get-user-orders.service';
import { tap } from 'rxjs/operators';
import { GetCompletedOrderDetailsService } from '../../../core/services/order.services/get-complete-order-details.service';
import { GetCompletedOrderDetails } from '../../../store/actions/order.actions';
import { Subscription } from 'rxjs';
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  public orders: CompleteOrderModel[];
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private orderService: GetCompletedOrdersService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe(res => {
      const USER_ID = res['params']['id'];
      this.orderService.getCompletedOrders(USER_ID).subscribe(() => {
        this.store
          .pipe(select(state => state.orders.completedOrders))
          .subscribe(res => {
            this.orders = res;
            this.showSpinner = false;
          });
      });
    });
  }

  getFullOrderView(orderId): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.router.navigate([`/user/completed/${orderId}`]);
    }
  }
}
