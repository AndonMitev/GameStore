import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Services
import { OrderGameService } from '../../../core/services/order.services/order-game.service';

@Component({
  selector: 'add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent {
  @Input('game')
  game;
  @Input('id')
  id: string;

  constructor(
    private orderService: OrderGameService,
    private toast: ToastrService
  ) {}

  orderSelectedGame(): void {
    this.orderService.orderGame(
      this.id,
      this.game._id,
      this.game.title,
      this.game.price,
      this.game.image
    );

    this.toast.success(
      `${this.game.title} was successfully added to your cart`
    );
  }
}
