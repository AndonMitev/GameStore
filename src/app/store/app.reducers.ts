import { gameReducer } from './reducers/game.reducers';
import { commentsReducer } from './reducers/comments.reducers';
import { orderReducer } from './reducers/order.reducers';
import { userReducer } from './reducers/user.reducers';

import { messageReducer } from './reducers/message.reducers';
export const appReducers = {
  games: gameReducer,
  comments: commentsReducer,
  orders: orderReducer,
  users: userReducer,
  messages: messageReducer
};
