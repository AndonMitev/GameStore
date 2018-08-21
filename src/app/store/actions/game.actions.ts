import { Action } from '@ngrx/store';

//Models
import { AllGamesModel } from '../../core/models/view-models/all-games.model';
import { DetailsGameModel } from '../../core/models/view-models/details-game.model';

export const GET_ALL_GAMES = '[GAMES] Get All Games';
export const GET_DETAILS_GAME = '[GAMES] Get Details For Game';

//Fix
export const GET_GAME_TO_EDIT = '[GAMES] Subscribe User To Game';
export const DELETE_GAME = '[GAMES] Delete Game';

export class GetAllGamesAction implements Action {
  readonly type: string = GET_ALL_GAMES;
  constructor(public payload: AllGamesModel[]) {}
}

export class GetDetailsGameAction implements Action {
  readonly type: string = GET_DETAILS_GAME;
  constructor(public payload: DetailsGameModel) {}
}

export class SubscribeUserAction implements Action {
  readonly type: string = GET_GAME_TO_EDIT;
  constructor(public payload: DetailsGameModel) {}
}

export class DeleteGameAction implements Action {
  readonly type: string = DELETE_GAME;
  constructor(public payload: string) {}
}

export type Types = GetAllGamesAction | GetDetailsGameAction | SubscribeUserAction | DeleteGameAction;
