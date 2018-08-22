import { CreateGameService } from './create-game.service';
import { GetAllGamesService } from './get-all-games.service';
import { GetDetailsGameService } from './get-details-game.service';
import { SubscriptionService } from './subscribe-game.service';
import { EditGameService } from './edit-game.service';
import { DeleteGameService } from './delete-game.service';

export const GAME_SERVICES = [
  CreateGameService,
  GetAllGamesService,
  GetDetailsGameService,
  SubscriptionService,
  DeleteGameService,
  EditGameService
];
