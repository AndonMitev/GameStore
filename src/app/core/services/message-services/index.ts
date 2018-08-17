import { CreateMessageService } from './create-message.service';
import { GetAllUserMessagesService } from './get-user-messages.service';

export const MESSAGE_SERVICES = [
  CreateMessageService,
  GetAllUserMessagesService
];
