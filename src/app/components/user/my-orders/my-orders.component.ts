import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

//Service
import { GetCompletedOrdersService } from '../../../core/services/order.services/get-user-orders.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  public orders: CompleteOrderModel[];
  public showSpinner: boolean;
  public currPage: number;
  public pageSize: number;
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private orderService: GetCompletedOrdersService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.currPage = 1;
    this.pageSize = 6;
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const USER_ID: string = res['params']['id'];

      this.orderService.getCompletedOrders(USER_ID).subscribe(() => {
        this.store
          .pipe(select((state: AppState) => state.orders.completedOrders))
          .subscribe((res: CompleteOrderModel[]) => {
            this.orders = res;
            this.showSpinner = false;
          });
      });
    });
  }

  public getFullOrderView(orderId: string): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.router.navigate([`/user/completed/${orderId}`]);
    }
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
