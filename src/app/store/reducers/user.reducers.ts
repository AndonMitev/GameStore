import * as UserActions from '../actions/user.actions';
import { UserState } from '../state/user.state';

const initialState: UserState = {
  user: null,
  subscriptions: []
};

function getUserById(state, userData) {
  return {
    ...state,
    user: userData
  };
}

function getUserByUsername(state, user) {
  return {
    ...state,
    user: user.slice(0, 1)
  };
}

function getUserSubscriptions(state, userSubscriptions) {
  return {
    ...state,
    subscriptions: userSubscriptions
  };
}

export function userReducer(
  state: UserState = initialState,
  action: UserActions.Types
) {
  switch (action.type) {
    case UserActions.GET_USER_BY_ID:
      return getUserById(state, action.payload);
    case UserActions.GET_USER_BY_USERNAME:
      return getUserByUsername(state, action.payload);
    case UserActions.GET_USER_SUBSCRIPTIONS:
      return getUserSubscriptions(state, action.payload);
    default:
      return state;
  }
}
