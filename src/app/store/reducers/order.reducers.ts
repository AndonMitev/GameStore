import * as OrderActions from '../actions/order.actions';
import { OrderState } from '../state/order.state';

const initialState: OrderState = {
  all: [],
  completedOrders: []
};

function getAllOrderedGames(state, games) {
  return {
    ...state,
    all: games
  };
}

function orderGame(state, game) {
  return {
    ...state,
    all: [...state.all, game]
  };
}

function deleteOrderedGame(state, index) {
  const GAME_TO_REMOVE = state.all[index];
  return {
    ...state,
    all: [...state.all.filter(game => game !== GAME_TO_REMOVE)]
  };
}

function completeOrder(state, order) {
  return {
    ...state,
    completedOrders: [...state.completedOrders, order]
  };
}

function getCompletedOrder(state, orders) {
  console.log(orders.map(x => x.order));
  return {
    ...state,
    completedOrders: orders
  };
}

export function orderReducer(
  state: OrderState = initialState,
  action: OrderActions.Types
) {
  switch (action.type) {
    case OrderActions.ORDER_GAME:
      return orderGame(state, action.payload);
    case OrderActions.GET_ALL_ORDERED_GAMES:
      return getAllOrderedGames(state, action.payload);
    case OrderActions.DELETE_GAME_FROM_ORDER_LIST:
      return deleteOrderedGame(state, action.payload);
    case OrderActions.COMPLETE_ORDER:
      return completeOrder(state, action.payload);
    case OrderActions.GET_ALL_COMPLETED_ORDERS:
      return getCompletedOrder(state, action.payload);
    default:
      return state;
  }
}
