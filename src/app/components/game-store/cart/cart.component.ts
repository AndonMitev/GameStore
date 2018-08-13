import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { OrderGameService } from '../../../core/services/order.services/order-game.service';

import { AppState } from '../../../store/app.state';
import { CompleteOrderService } from '../../../core/services/order.services/complete-order.service';
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private order$;
  private orderModel: CompleteOrderModel;

  constructor(
    private cartService: OrderGameService,
    private store: Store<AppState>,
    private toast: ToastrService,
    private completeService: CompleteOrderService,
    private localStorage: LocalStorage
  ) {}

  ngOnInit(): void {
    this.cartService.viewOrder().subscribe(() => {
      this.order$ = this.store.pipe(select(state => state.orders.all));
    });
  }

  removeItem(index) {
    this.cartService.deleteGame(index).subscribe(() => {
      this.toast.success('Game successfully removed from order list!');
    });
  }

  completeOrder() {
    this.localStorage.getItem('order').subscribe(res => {
      const USER_ID = localStorage.getItem('userId');
      const ORDER = JSON.stringify(res);
      this.orderModel = new CompleteOrderModel(USER_ID, ORDER);
      this.completeService.finishOrder(this.orderModel).subscribe(() => {
        this.toast.success('Order were successfully created!');
      });
    });
  }
}
