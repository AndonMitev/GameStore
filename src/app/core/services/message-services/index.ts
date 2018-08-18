import { CreateMessageService } from './create-message.service';
import { GetAllUserMessagesService } from './get-sent-messages.service';
import { GetReceivedMessagesService } from './get-received-messages.service';
import { GetMessageDetailsService } from './get-message-details.service';

export const MESSAGE_SERVICES = [
  CreateMessageService,
  GetAllUserMessagesService,
  GetReceivedMessagesService,
  GetMessageDetailsService
];
