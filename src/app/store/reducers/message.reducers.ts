import * as MessageActions from '../actions/message.actions';
import { MessageState } from '../state/message.state';

const initialState: MessageState = {
  all: []
};

function getAllMessages(state, messages) {
  return {
    ...state,
    all: [...messages]
  };
}

function createMessage(state, message) {
  return {
    ...state,
    all: [...state.all]
  };
}

export function messageReducer(
  state: MessageState = initialState,
  action: MessageActions.Types
) {
  switch (action.type) {
    case MessageActions.GET_ALL_MESSAGES:
      return getAllMessages(state, action.payload);
    case MessageActions.CREATE_MESSAGE:
      return createMessage(state, action.payload);
    default:
      return state;
  }
}
