import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  public buttonText: string;
  public isClicked: boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private cartService: OrderGameService,
    private store: Store<AppState>,
    private toast: ToastrService,
    private completeService: CompleteOrderService,
    private router: Router
  ) {
    this.buttonText = 'Finish order';
    this.isClicked = false;
    this.currPage = 1;
    this.pageSize = 2;
  }

  public ngOnInit(): void {
    this.cartService.viewOrder();
    this.store
      .pipe(
        select((state: AppState) => (this.order = state.orders.all)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public removeItem(gameId: string): void {
    this.cartService.deleteGame(gameId);
    this.toast.success(`Game was successfully deleted from your cart!`);
  }

  public completeOrder(): void {
    this.store
      .pipe(
        select(state => state.orders.all),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(res => {
        this.buttonText = 'Processing...';
        this.isClicked = true;
        const FINAL_ORDER = {
          userId: localStorage.getItem('userId'),
          order: res
        };

        this.completeService
          .finishOrder(FINAL_ORDER)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            sessionStorage.clear();

            this.toast.success('Order was successfully created!');
            this.router.navigate([`/user/profile/${FINAL_ORDER.userId}`]);
          });
      });
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
