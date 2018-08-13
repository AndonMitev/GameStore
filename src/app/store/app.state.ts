import { GameState } from "./state/game.state";
import { CommentsState } from "./state/comments.state";
import { OrderState } from "./state/order.state";
import { UserState } from "./state/user.state";

export interface AppState {
  games: GameState,
  comments: CommentsState,
  orders: OrderState,
  users: UserState
}