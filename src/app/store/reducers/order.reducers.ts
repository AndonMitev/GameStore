import * as OrderActions from '../actions/order.actions';
import { OrderState } from '../state/order.state';

const INITIAL_STATE: OrderState = {
  all: [],
  completedOrders: [],
  details: null
};

function addGameToOrder(state, game) {
  console.log(game);
  return {
    ...state,
    all: [...state.all, game]
  };
}

function deleteGameFromOrder(state, gameId) {
  return {
    ...state,
    all: [...state.all.filter(game => game.gameId !== gameId)]
  };
}

function viewAllAddedGamesToOrder(state, games) {
  return {
    ...state,
    all: games
  };
}

function completeOrder(state, order) {
  return {
    ...state,
    completedOrders: [...state.completedOrders, order]
  };
}

function getCompletedOrder(state, orders) {
  return {
    ...state,
    completedOrders: orders
  };
}

function getCompletedOrderDetails(state, orderData) {
  return {
    ...state,
    details: JSON.parse(orderData.order)
  };
}

export function orderReducer(
  state: OrderState = INITIAL_STATE,
  action: OrderActions.Types
) {
  switch (action.type) {
    case OrderActions.ORDER_GAME:
      return addGameToOrder(state, action.payload);
    case OrderActions.GET_ALL_ORDERED_GAMES:
      return viewAllAddedGamesToOrder(state, action.payload);
    case OrderActions.DELETE_GAME_FROM_ORDER_LIST:
      return deleteGameFromOrder(state, action.payload);
    case OrderActions.COMPLETE_ORDER:
      return completeOrder(state, action.payload);
    case OrderActions.GET_ALL_COMPLETED_ORDERS:
      return getCompletedOrder(state, action.payload);
    case OrderActions.GET_COMPLETED_ORDER_DETAILS:
      return getCompletedOrderDetails(state, action.payload);
    default:
      return state;
  }
}
