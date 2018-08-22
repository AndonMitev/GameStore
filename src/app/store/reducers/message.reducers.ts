import * as MessageActions from '../actions/message.actions';
import { MessageState } from '../state/message.state';

const initialState: MessageState = {
  all: [],
  sentMessages: [],
  recievedMessages: [],
  details: null
};

function getSentMessages(state, messages) {
  return {
    ...state,
    sentMessages: messages.sort((a, b) => b._kmd.ect > a._kmd.ect)
  };
}

function getReceivedMessages(state, messages) {
  return {
    ...state,
    recievedMessages: messages.sort((a, b) => b._kmd.ect > a._kmd.ect)
  };
}

function createMessage(state, message) {
  if (localStorage.getItem('username') === message['recipient']) {
    return {
      ...state,
      // Might be removed !?
      recievedMessages: [...state.recievedMessages, message]
    };
  } else {
    return {
      ...state,
      sentMessages: [...state.sentMessages, message]
    };
  }
}

function getMessageDetails(state, message) {
  return {
    ...state,
    details: message
  };
}

export function messageReducer(
  state: MessageState = initialState,
  action: MessageActions.Types
) {
  switch (action.type) {
    case MessageActions.GET_SENT_MESSAGES:
      return getSentMessages(state, action.payload);
    case MessageActions.GET_RECEIVED_MESSAGES:
      return getReceivedMessages(state, action.payload);
    case MessageActions.CREATE_MESSAGE:
      return createMessage(state, action.payload);
    case MessageActions.GET_MESSAGE_DETAILS:
      return getMessageDetails(state, action.payload);
    default:
      return state;
  }
}
