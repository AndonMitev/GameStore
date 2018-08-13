import { AllGamesModel } from '../../core/models/view-models/all-games.model';
import { DetailsGameModel } from '../../core/models/view-models/details-game.model';

export interface GameState {
  all: AllGamesModel[];
  details: DetailsGameModel;
}
