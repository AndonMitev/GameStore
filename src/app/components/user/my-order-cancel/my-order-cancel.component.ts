import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

//Service
import { CancelMyOrderService } from '../../../core/services/order.services/my-order-cancel.service';

@Component({
  selector: 'my-order-cancel',
  templateUrl: './my-order-cancel.component.html',
  styleUrls: ['./my-order-cancel.component.css']
})
export class MyOrderCancelComponent {
  @Input('orderId')
  private orderId: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public buttonText: string;
  public isClicked: boolean;

  constructor(
    private orderService: CancelMyOrderService,
    private toast: ToastrService
  ) {
    this.buttonText = 'Cancel';
    this.isClicked = false;
  }

  public cancelSelectedOrder(): void {
    this.buttonText = 'Processing...';
    this.isClicked = true;

    this.orderService
      .cancelMyOrder(this.orderId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.buttonText = 'Cancel';
        this.isClicked = false;
        this.toast.success('Order was successfully canceled!');
      });
  }
}
