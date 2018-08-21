import { Action } from '@ngrx/store';
import { CreateMessageInputModel } from '../../core/models/input-models/message-model';

export const GET_SENT_MESSAGES = '[MESSAGES] Get User Sent Messages';
export const GET_RECEIVED_MESSAGES = '[MESSAGES] Get User Received Messages';
export const CREATE_MESSAGE = '[MESSAGES] Create New Message';
export const GET_MESSAGE_DETAILS = '[MESSAGES] Get Details For Message';

export class CreateMessageAction implements Action {
  readonly type: string = CREATE_MESSAGE;
  constructor(public payload: CreateMessageInputModel) {}
}

export class GetSentMessagesAction implements Action {
  readonly type: string = GET_SENT_MESSAGES;
  constructor(public payload: CreateMessageInputModel[]) {}
}

export class GetReceivedMessagesAction implements Action {
  readonly type: string = GET_RECEIVED_MESSAGES;
  constructor(public payload: CreateMessageInputModel[]) {}
}

export class GetMessageDetailsAction implements Action {
  readonly type: string = GET_MESSAGE_DETAILS;
  constructor(public payload: CreateMessageInputModel) {}
}

export type Types = CreateMessageAction | GetSentMessagesAction | GetReceivedMessagesAction;
