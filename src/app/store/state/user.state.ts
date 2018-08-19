import { RegisterInputModel } from "../../core/models/input-models/register.model";
import { CompleteOrderModel } from "../../core/models/view-models/complete-order.model";

export interface UserState {
  user: RegisterInputModel,
  subscriptions: CompleteOrderModel[]
}