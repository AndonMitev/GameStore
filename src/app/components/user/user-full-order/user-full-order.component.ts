import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetCompletedOrderDetailsService } from '../../../core/services/order.services/get-complete-order-details.service';

@Component({
  selector: 'user-full-order',
  templateUrl: './user-full-order.component.html',
  styleUrls: ['./user-full-order.component.css']
})
export class UserFullOrderComponent implements OnInit {
  private fullOrder$;
  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private orderService: GetCompletedOrderDetailsService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe(res => {
      const ORDER_ID = res['params']['id'];
      this.orderService
        .getCompletedOrderDetails(ORDER_ID)
        .subscribe(() =>
         this.fullOrder$ = this.store.pipe(select(state => state.orders.details))
        );
    });
  }
}
