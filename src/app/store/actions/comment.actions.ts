import { Action } from '@ngrx/store';

import { CommentGameInputModel } from '../../core/models/input-models/create-comment-game.model';
import { AllCommentsGameModel } from '../../core/models/view-models/all-comments-game.model';

export const ADD_COMMENT = '[COMMENTS] Add New Comment';
export const GET_ALL_COMMENTS = '[COMMENTS] Get All Comments';
export const DELETE_COMMENT = '[COMMENT] Delete Comment';
export const GET_ALL_USER_COMMENTS = '[COMMENTS] Get All User Comments';

export class GetAllCommentsAction implements Action {
  readonly type: string = GET_ALL_COMMENTS;
  constructor(public payload: AllCommentsGameModel[]) {}
}

export class AddCommentAction implements Action {
  readonly type: string = ADD_COMMENT;
  constructor(public payload: CommentGameInputModel) {}
}

export class DeleteCommentAction implements Action {
  readonly type: string = DELETE_COMMENT;
  constructor(public payload: string) {}
}

export class GetUserCommentsAction implements Action {
  readonly type: string = GET_ALL_USER_COMMENTS;
  constructor(public payload: AllCommentsGameModel[]) {}
}

export type Types =
  | AddCommentAction
  | GetAllCommentsAction
  | DeleteCommentAction
  | GetUserCommentsAction;
