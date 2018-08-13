import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//Services
import { ToastrService } from 'ngx-toastr';
import { OrderGameService } from '../../../core/services/order.services/order-game.service';


@Component({
  selector: 'add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnDestroy {
  @Input('game')
  game;
  private subscription: Subscription

  constructor(
    private orderService: OrderGameService,
    private toast: ToastrService
  ) {}

  orderSelectedGame() {
    this.subscription = this.orderService
      .orderGame(this.game)
      .subscribe(() =>
        this.toast.success(`${this.game.title} successful added!`)
      );
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
