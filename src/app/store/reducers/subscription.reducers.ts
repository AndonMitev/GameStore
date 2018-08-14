import * as SubscriptionActions from '../actions/subscription.actions';
import { SubscriptionState } from '../state/subscription.state';

const initialState: SubscriptionState = {
  all: []
};

function getAllUserSubscriptions(state, userSubscriptions) {
  return {
    ...state,
    subscriptions: userSubscriptions
  };
}

function subscribeToGame(state, game) {
  console.log(state);
  console.log(game);
  return {
    ...state,
    subscriptions: [...state.all, game]
  };
}

export function subscriptionReducer(
  state = initialState,
  action: SubscriptionActions.Types
) {
  switch (action.type) {
    case SubscriptionActions.SUBSCRIBE_TO_GAME:
      return subscribeToGame(state, action.payload);
    case SubscriptionActions.GET_ALL_USER_SUBSCRIPTIONS:
      return getAllUserSubscriptions(state, action.payload);
    default:
      return state;
  }
}
