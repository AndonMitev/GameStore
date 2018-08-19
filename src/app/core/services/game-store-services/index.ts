import { CreateGameService } from './create-game.service';
import { GetAllGamesService } from './get-all-games.service';
import { GetDetailsGameService } from './get-details-game.service';
import { EditGameService } from './edit-game.service';
import { OrderGameService } from '../order.services/order-game.service';

export const GAME_SERVICES = [
  CreateGameService,
  GetAllGamesService,
  GetDetailsGameService,
  EditGameService,
  OrderGameService
];
