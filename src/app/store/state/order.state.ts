import { CompleteOrderModel } from '../../core/models/view-models/complete-order.model';

export interface OrderState {
  all: CompleteOrderModel[];
  orders: CompleteOrderModel[];
}
