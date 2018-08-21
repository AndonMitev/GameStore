import * as GameActions from '../actions/game.actions';
import { GameState } from '../state/game.state';

const initialState: GameState = {
  all: [],
  details: null
};

function getAllGames(state, allGames) {
  return {
    ...state,
    all: allGames
  };
}

function getDetailsGame(state, game) {
  return {
    ...state,
    details: game
  };
}

function editGame(state, game) {
  return {
    ...state,
    details: game
  };
}

function deleteGame(state, id) {
  return {
    ...state,
    all: [...state.all.filter(g => g._id !== id)]
  };
}

export function gameReducer(
  state: GameState = initialState,
  action: GameActions.Types
) {
  switch (action.type) {
    case GameActions.GET_ALL_GAMES:
      return getAllGames(state, action.payload);
    case GameActions.GET_DETAILS_GAME:
      return getDetailsGame(state, action.payload);
    case GameActions.GET_GAME_TO_EDIT:
      return editGame(state, action.payload);
    case GameActions.DELETE_GAME:
      return deleteGame(state, action.payload);
    default:
      return state;
  }
}
