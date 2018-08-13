//Game
import { CreateGameService } from './create-game.service';
import { GetAllGamesService } from './get-all-games.service';
import { GetDetailsGameService } from './get-details-game.service';
//Order
import { OrderGameService } from '../order.services/order-game.service';
//Comments

export const GAME_SERVICES = [
  CreateGameService,
  GetAllGamesService,
  GetDetailsGameService,
  OrderGameService
];
