import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Service
import { GetCompletedOrderDetailsService } from '../../../core/services/order.services/get-complete-order-details.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';

@Component({
  selector: 'my-full-order-details',
  templateUrl: './my-full-order-details.component.html',
  styleUrls: ['./my-full-order-details.component.css']
})
export class MyFullOrderDetails implements OnInit, OnDestroy {
  public fullOrder$: Observable<CompleteOrderModel>;
  public orderNumber: string;
  public showSpinner: boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private orderService: GetCompletedOrderDetailsService
  ) {
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.router.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const ORDER_ID = res['params']['id'];
        this.orderNumber = ORDER_ID;

        this.orderService
          .getCompletedOrderDetails(ORDER_ID)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.fullOrder$ = this.store.pipe(
              select((state: AppState) => state.orders.details),
              takeUntil(this.ngUnsubscribe)
            );
            this.showSpinner = false;
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
