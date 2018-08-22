import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AppState } from '../../../store/app.state';
import { GetCompletedOrderDetailsService } from '../../../core/services/order.services/get-complete-order-details.service';
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';

@Component({
  selector: 'my-full-order-details',
  templateUrl: './my-full-order-details.component.html',
  styleUrls: ['./my-full-order-details.component.css']
})
export class MyFullOrderDetails implements OnInit, OnDestroy {
  public fullOrder$: Observable<CompleteOrderModel>;
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private orderService: GetCompletedOrderDetailsService
  ) {
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.subscription = this.router.paramMap.subscribe((res: ParamMap) => {
      const ORDER_ID = res['params']['id'];

      this.orderService.getCompletedOrderDetails(ORDER_ID).subscribe(() => {
        this.fullOrder$ = this.store.pipe(
          select((state: AppState) => state.orders.details)
        );
        this.showSpinner = false;
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
