import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Services
import { CRUD_METHODS } from './crud-methods';
import { AUTHENTICATION_SERVICES } from './authentication-services';
import { GAME_SERVICES } from './game-store-services';
import { COMMENT_SERVICES } from './comment-services';
import { ORDER_SERVICES } from './order.services';
import { MESSAGE_SERVICES } from './message-services';
import { PROFILE_SERVICES } from './profile-services';

@NgModule({
  providers: [
    ...CRUD_METHODS,
    ...AUTHENTICATION_SERVICES,
    ...GAME_SERVICES,
    ...COMMENT_SERVICES,
    ...ORDER_SERVICES,
    ...MESSAGE_SERVICES,
    ...PROFILE_SERVICES
  ],
  imports: [CommonModule]
})
export class ServiceModule {}
