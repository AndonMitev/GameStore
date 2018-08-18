import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

//Services
import { OrderGameService } from '../../../core/services/order.services/order-game.service';
import { CompleteOrderService } from '../../../core/services/order.services/complete-order.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';

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
    private completeService: CompleteOrderService
  ) {}

  ngOnInit(): void {
    this.cartService.viewOrder();
    this.store
      .pipe(select((state: AppState) => (this.order$ = state.orders.all)))
      .subscribe();
  }

  removeItem(gameId) {
    this.cartService.deleteGame(gameId);
    this.toast.success(`Game was successfully deleted from your cart!`);
  }

  completeOrder() {
    /* this.localStorage.getItem('order').subscribe(res => {
      const USER_ID = localStorage.getItem('userId');
      const ORDER = JSON.stringify(res);
      this.orderModel = new CompleteOrderModel(USER_ID, ORDER);
      this.completeService.finishOrder(this.orderModel).subscribe(() => {
        this.toast.success('Order were successfully created!');
      });
    }); */
  }
}
