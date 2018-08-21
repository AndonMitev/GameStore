import { Action } from '@ngrx/store';
import { RegisterInputModel } from '../../core/models/input-models/register.model';
import { CompleteOrderModel } from '../../core/models/view-models/complete-order.model';

export const GET_USER_BY_ID = '[USER] Get User Username By Id';
export const GET_USER_BY_USERNAME = '[USER] Get User Id By Username';
export const GET_USER_SUBSCRIPTIONS = '[USER] Get User Subscriptions';

//FIX
export const UNSUBSCRIBE_USER = '[USER] Unsubscribe';

export class GetUserByIdAction implements Action {
  readonly type: string = GET_USER_BY_ID;
  constructor(public payload: RegisterInputModel) {}
}

export class GetUserByUsernameAction implements Action {
  readonly type: string = GET_USER_BY_USERNAME;
  constructor(public payload: RegisterInputModel) {}
}

export class GetUserSubscriptionsAction implements Action {
  readonly type: string = GET_USER_SUBSCRIPTIONS;
  constructor(public payload: CompleteOrderModel[]) {}
}

export class UnsubscribeUserAction implements Action {
  readonly type: string = UNSUBSCRIBE_USER;
  constructor(public payload: string) {}
}

export type Types =
  | GetUserByIdAction
  | GetUserByUsernameAction
  | GetUserSubscriptionsAction
  | UnsubscribeUserAction;
