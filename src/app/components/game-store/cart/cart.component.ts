import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class CartComponent implements OnInit, OnDestroy {
  public order: CompleteOrderModel[];
  public currPage: number;
  public pageSize: number;
  private subscription: Subscription;

  constructor(
    private cartService: OrderGameService,
    private store: Store<AppState>,
    private toast: ToastrService,
    private completeService: CompleteOrderService,
    private router: Router
  ) {
    this.currPage = 1;
    this.pageSize = 2;
  }

  ngOnInit(): void {
    this.cartService.viewOrder();
    this.store
      .pipe(select((state: AppState) => (this.order = state.orders.all)))
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeItem(gameId: string): void {
    this.cartService.deleteGame(gameId);
    this.toast.success(`Game was successfully deleted from your cart!`);
  }

  completeOrder(): void {
    this.subscription = this.store
      .pipe(select(state => state.orders.all))
      .subscribe(res => {
        const FINAL_ORDER = {
          userId: localStorage.getItem('userId'),
          order: res
        };

        this.completeService.finishOrder(FINAL_ORDER).subscribe(() => {
          sessionStorage.clear();
          this.toast.success('Order was successfully created!');
          this.router.navigate([`/user/profile/${FINAL_ORDER.userId}`]);
        });
      });
  }

  pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
