import { Action } from '@ngrx/store';
import { CreateMessageInputModel } from '../../core/models/input-models/message-model';

export const GET_SENT_MESSAGES = '[MESSAGE] Sent';
export const GET_RECEIVED_MESSAGES = '[MESSAGE] Received';
export const CREATE_MESSAGE = '[MESSAGE] Create';
export const GET_MESSAGE_DETAILS = '[MESSAGE] Details';

export class CreateMessage implements Action {
  readonly type: string = CREATE_MESSAGE;
  constructor(public payload: CreateMessageInputModel) {}
}

export class GetSentMessages implements Action {
  readonly type: string = GET_SENT_MESSAGES;
  constructor(public payload: CreateMessageInputModel[]) {}
}

export class GetReceivedMessages implements Action {
  readonly type: string = GET_RECEIVED_MESSAGES;
  constructor(public payload: CreateMessageInputModel[]) {}
}

export class GetMessageDetails implements Action {
  readonly type: string = GET_MESSAGE_DETAILS;
  constructor(public payload: CreateMessageInputModel) {}
}

export type Types = CreateMessage | GetSentMessages | GetReceivedMessages;
