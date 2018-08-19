import { Action } from '@ngrx/store';

//Models
import { AllGamesModel } from '../../core/models/view-models/all-games.model';
import { DetailsGameModel } from '../../core/models/view-models/details-game.model';

export const GET_ALL_GAMES = '[GAMES] All';
export const GET_DETAILS_GAME = '[GAMES] Details';
export const EDIT_GAME = '[GAMES] Edit';

export class GetAllGames implements Action {
  readonly type: string = GET_ALL_GAMES;
  constructor(public payload: AllGamesModel[]) {}
}

export class GetDetailsGame implements Action {
  readonly type: string = GET_DETAILS_GAME;
  constructor(public payload: DetailsGameModel) {}
}

export class EditGame implements Action {
  readonly type: string = EDIT_GAME;
  constructor(public payload: DetailsGameModel) {}
}

export type Types = GetAllGames | GetDetailsGame | EditGame;
