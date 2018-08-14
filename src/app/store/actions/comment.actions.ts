import { Action } from '@ngrx/store';

import { CommentGameInputModel } from '../../core/models/input-models/create-comment-game.model';
import { AllCommentsGameModel } from '../../core/models/view-models/all-comments-game.model';

export const ADD_COMMENT = '[COMMENT] Add';
export const GET_ALL_COMMENTS = '[COMMENTS] All';
export const DELETE_COMMENT = '[COMMENT] Delete';
export const GET_ALL_USER_COMMENTS = '[COMMENTS] User';

export class GetAllComments implements Action {
  readonly type: string = GET_ALL_COMMENTS;
  constructor(public payload: AllCommentsGameModel[]) {}
}

export class AddComment implements Action {
  readonly type: string = ADD_COMMENT;
  constructor(public payload: CommentGameInputModel) {}
}

export class DeleteComment implements Action {
  readonly type: string = DELETE_COMMENT;
  constructor(public payload: string) {}
}

export class GetUserComments implements Action {
  readonly type: string = GET_ALL_USER_COMMENTS;
  constructor(public payload: AllCommentsGameModel[]) { }
}

export type Types = AddComment | GetAllComments | DeleteComment | GetUserComments;
