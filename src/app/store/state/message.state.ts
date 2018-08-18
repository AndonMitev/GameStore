import { CreateMessageInputModel } from '../../core/models/input-models/message-model';

export interface MessageState {
  all: CreateMessageInputModel[];
  sentMessages: CreateMessageInputModel[];
  recievedMessages: CreateMessageInputModel[];
  details: CreateMessageInputModel
}
