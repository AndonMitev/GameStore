import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyFullOrderDetails } from './my-full-order-details/my-full-order-details.component';
import { MyMessageDetailsComponent } from './my-message-details/my-message-details.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';

const routes: Routes = [
  {
    path: 'profile/:id',
    canActivate: [AuthGuard],
    component: MyProfileComponent
  },
  {
    path: 'profile/messages/:id',
    canActivate: [AuthGuard],
    component: MyMessagesComponent
  },
  {
    path: 'profile/orders/details/:id',
    canActivate: [AuthGuard],
    component: MyFullOrderDetails
  },
  {
    path: 'profile/message/details/:id',
    canActivate: [AuthGuard],
    component: MyMessageDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {}
