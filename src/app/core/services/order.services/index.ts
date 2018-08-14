import {CompleteOrderService} from './complete-order.service';
import {GetCompletedOrderDetailsService} from './get-complete-order-details.service'
import {GetCompletedOrdersService} from './get-user-orders.service'
import {OrderGameService} from './order-game.service'

export const ORDER_SERVICES = [
  CompleteOrderService,
  GetCompletedOrdersService,
  GetCompletedOrderDetailsService,
  OrderGameService
]