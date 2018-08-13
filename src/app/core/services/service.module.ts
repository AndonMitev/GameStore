import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Services
import { AUTHENTICATION_SERVICES } from './authentication';
import { GAME_SERVICES } from './game-store-services';
import { COMMENT_SERVICES } from './comment-services';

@NgModule({
  providers: [
    ...AUTHENTICATION_SERVICES,
    ...GAME_SERVICES,
    ...COMMENT_SERVICES
  ],
  imports: [CommonModule]
})
export class ServiceModule {}
