import * as CommentsActions from '../actions/comment.actions';
import { CommentsState } from '../state/comments.state';

const initialState: CommentsState = {
  all: []
};

function getAllComments(state, allComments) {
  
  return {
    ...state,
    all: allComments.sort((a, b) => b._kmd.ect > a._kmd.ect)
  };
}

function addComment(state, comment) {
  return {
    ...state,
    all: state.all.concat(comment).sort((a, b) => b._kmd.ect > a._kmd.ect)
  };
}

function deleteComment(state, id) {
  return {
    ...state,
    all: [...state.all.filter(comment => comment._id !== id)]
  };
}

function getUserComments(state, userComments) {
  return {
    ...state,
    all: userComments
  };
}

export function commentsReducer(
  state: CommentsState = initialState,
  action: CommentsActions.Types
) {
  switch (action.type) {
    case CommentsActions.ADD_COMMENT:
      return addComment(state, action.payload);
    case CommentsActions.GET_ALL_COMMENTS:
      return getAllComments(state, action.payload);
    case CommentsActions.DELETE_COMMENT:
      return deleteComment(state, action.payload);
    case CommentsActions.GET_ALL_USER_COMMENTS:
      return getUserComments(state, action.payload);
    default:
      return state;
  }
}
