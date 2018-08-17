import { Action } from '@ngrx/store';
import { CreateMessageInputModel } from '../../core/models/input-models/message-model';

export const GET_ALL_MESSAGES = '[MESSAGE] All';
export const CREATE_MESSAGE = '[MESSAGE] Create';

export class CreateMessage implements Action {
  readonly type: string = CREATE_MESSAGE;
  constructor(public payload: CreateMessageInputModel) {}
}

export class GetAllMessages implements Action {
  readonly type: string = GET_ALL_MESSAGES;
  constructor(public payload: CreateMessageInputModel[]) {}
}

export type Types = CreateMessage | GetAllMessages;
