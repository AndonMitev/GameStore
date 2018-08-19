import { Action } from '@ngrx/store';
import { RegisterInputModel } from '../../core/models/input-models/register.model';
import { CompleteOrderModel } from '../../core/models/view-models/complete-order.model';

export const GET_USER_BY_ID = '[USER] Id';
export const GET_USER_BY_USERNAME = '[USER] Username';
export const GET_USER_SUBSCRIPTIONS = '[USER] Subscriptions';

export class GetUserById implements Action {
  readonly type: string = GET_USER_BY_ID;
  constructor(public payload: RegisterInputModel) {}
}

export class GetUserByUsername implements Action {
  readonly type: string = GET_USER_BY_USERNAME;
  constructor(public payload: RegisterInputModel) {}
}

export class GetUserSubscriptions implements Action {
  readonly type: string = GET_USER_SUBSCRIPTIONS;
  constructor(public payload: CompleteOrderModel[]) {}
}

export type Types = GetUserById | GetUserByUsername | GetUserSubscriptions;
