import * as OrderActions from '../actions/order.actions';
import { OrderState } from '../state/order.state';

const INITIAL_STATE: OrderState = {
  all: [],
  completedOrders: [],
  details: null
};

function addGameToOrderList(state, game) {
  return {
    ...state,
    all: [...state.all, game]
  };
}

function deleteGameFromOrderList(state, gameId) {
  return {
    ...state,
    all: [...state.all.filter(game => game.gameId !== gameId)]
  };
}

function viewAllAddedGamesToOrderInList(state, games) {
  return {
    ...state,
    all: games
  };
}

function completeOrder(state, order) {
  console.log(order);
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
    details: orderData.order
  };
}

function cancelMyCompletedOrder(state, id) {
  return {
    ...state,
    completedOrders: [...state.completedOrders.filter(o => o._id !== id)]
  };
}

export function orderReducer(
  state: OrderState = INITIAL_STATE,
  action: OrderActions.Types
) {
  switch (action.type) {
    case OrderActions.ADD_GAME_IN_ORDER_LIST:
      return addGameToOrderList(state, action.payload);
    case OrderActions.GET_ALL_ORDERED_GAMES_IN_LIST:
      return viewAllAddedGamesToOrderInList(state, action.payload);
    case OrderActions.DELETE_GAME_FROM_ORDER_LIST:
      return deleteGameFromOrderList(state, action.payload);
    case OrderActions.COMPLETE_ORDER:
      return completeOrder(state, action.payload);
    case OrderActions.GET_ALL_COMPLETED_ORDERS:
      return getCompletedOrder(state, action.payload);
    case OrderActions.GET_COMPLETED_ORDER_DETAILS:
      return getCompletedOrderDetails(state, action.payload);
    case OrderActions.CANCEL_MY_ORDER:
      return cancelMyCompletedOrder(state, action.payload);
    default:
      return state;
  }
}
