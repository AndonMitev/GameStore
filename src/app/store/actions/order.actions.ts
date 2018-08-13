import { Action } from '@ngrx/store';
import { DetailsGameModel } from '../../core/models/view-models/details-game.model';
import { CompleteOrderModel } from '../../core/models/view-models/complete-order.model';

export const GET_ALL_ORDERED_GAMES = '[ORDER] All';
export const ORDER_GAME = '[ORDER] Add';
export const DELETE_GAME_FROM_ORDER_LIST = '[ORDER] Delete';
export const COMPLETE_ORDER = '[ORDER] Complete';
export const GET_ALL_COMPLETED_ORDERS = '[ORDER] AllCompleted';

export class GetAllOrderedGames implements Action {
  readonly type: string = GET_ALL_ORDERED_GAMES;
  constructor(public payload: CompleteOrderModel[]) {}
}

export class OrderGame implements Action {
  readonly type: string = ORDER_GAME;
  constructor(public payload: CompleteOrderModel) {}
}

export class DeleteGameFromOrderedList implements Action {
  readonly type: string = DELETE_GAME_FROM_ORDER_LIST;
  constructor(public payload: number) {}
}

export class CompleteOrder implements Action {
  readonly type: string = COMPLETE_ORDER;
  constructor(public payload: CompleteOrderModel[]) {}
}

export class GetCompletedOrder implements Action {
  readonly type: string = GET_ALL_COMPLETED_ORDERS;
  constructor(public payload: CompleteOrder[]) {}
}

export type Types =
  | OrderGame
  | GetAllOrderedGames
  | DeleteGameFromOrderedList
  | CompleteOrder
  | GetCompletedOrder;
