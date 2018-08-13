import * as UserActions from '../actions/user.actions';
import { UserState } from '../state/user.state';

const initialState: UserState = {
  user: null
};

function getUser(state, userData) {
  return {
    ...state,
    user: userData
  };
}

export function userReducer(
  state: UserState = initialState,
  action: UserActions.Types
) {
  switch (action.type) {
    case UserActions.GET_USER:
      return getUser(state, action.payload);
    default:
      return state;
  }
}
