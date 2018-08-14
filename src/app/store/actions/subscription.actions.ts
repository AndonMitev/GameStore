import { Action } from '@ngrx/store';
import { SubscribeToGameModel } from '../../core/models/view-models/subscribe-to-game.model';

export const SUBSCRIBE_TO_GAME = '[SUBSCRIBE] To game';
export const GET_ALL_USER_SUBSCRIPTIONS = '[SUBSCRIBE] All';

export class SubscribeToGame implements Action {
  readonly type: string = SUBSCRIBE_TO_GAME;
  constructor(public payload: SubscribeToGameModel) {}
}

export class GetAllUserSubscriptions {
  readonly type: string = GET_ALL_USER_SUBSCRIPTIONS;
  constructor(public payload: SubscribeToGameModel[]) {}
}

export type Types = SubscribeToGame | GetAllUserSubscriptions;
