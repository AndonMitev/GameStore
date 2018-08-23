import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Service
import { GetCompletedOrdersService } from '../../../core/services/order.services/get-user-orders.service';
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  public orders: CompleteOrderModel[];
  public showSpinner: boolean;
  public currPage: number;
  public pageSize: number;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public verification: UserVerificationService,
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
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const USER_ID: string = res['params']['id'];

        this.orderService
          .getCompletedOrders(USER_ID)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.store
              .pipe(
                select((state: AppState) => state.orders.completedOrders),
                takeUntil(this.ngUnsubscribe)
              )
              .subscribe(res => (this.orders = res));
            this.showSpinner = false;
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getFullOrderView(orderId: string): void {
    this.router.navigate([`/user/profile/orders/details/${orderId}`]);
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
