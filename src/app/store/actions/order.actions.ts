import { Action } from '@ngrx/store';

import { CompleteOrderModel } from '../../core/models/view-models/complete-order.model';

export const GET_ALL_ORDERED_GAMES_IN_LIST = '[ORDERS] Get List With Ordered Games';
export const ADD_GAME_IN_ORDER_LIST = '[ORDERS] Add New Game To List';
export const DELETE_GAME_FROM_ORDER_LIST = '[ORDERS] Delete Game From List';
export const COMPLETE_ORDER = '[ORDERS] Complete Order';
export const GET_ALL_COMPLETED_ORDERS = '[ORDERS] Get All Completed Orders';
export const GET_COMPLETED_ORDER_DETAILS = '[ORDERS] Get Completed Order Details';
export const CANCEL_MY_ORDER = '[ORDERS] Cancel My Completed Order';

export class GetAllOrderedGamesAction implements Action {
  readonly type: string = GET_ALL_ORDERED_GAMES_IN_LIST;
  constructor(public payload: CompleteOrderModel[]) {}
}

export class OrderGameAction implements Action {
  readonly type: string = GET_ALL_ORDERED_GAMES_IN_LIST;
  constructor(public payload: CompleteOrderModel) {}
}

export class DeleteGameFromOrderedListAction implements Action {
  readonly type: string = DELETE_GAME_FROM_ORDER_LIST;
  constructor(public payload: string) {}
}

export class CompleteOrderAction implements Action {
  readonly type: string = COMPLETE_ORDER;
  constructor(public payload: CompleteOrderModel[]) {}
}

export class GetCompletedOrdersAction implements Action {
  readonly type: string = GET_ALL_COMPLETED_ORDERS;
  constructor(public payload: CompleteOrderModel[]) {}
}

export class GetCompletedOrderDetailsAction implements Action {
  readonly type: string = GET_COMPLETED_ORDER_DETAILS;
  constructor(public payload: CompleteOrderModel) {}
}

export class CancelMyCompletedOrderAction implements Action {
  readonly type: string = CANCEL_MY_ORDER;
  constructor(public payload: string) {}
}

export type Types =
  | OrderGameAction
  | GetAllOrderedGamesAction
  | DeleteGameFromOrderedListAction
  | CompleteOrderAction
  | GetCompletedOrdersAction
  | GetCompletedOrderDetailsAction
  | CancelMyCompletedOrderAction;
