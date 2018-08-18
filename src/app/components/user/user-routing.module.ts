import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

import { ProfileComponent } from './profile/profile.component';
import { UserFullOrderComponent } from './user-full-order/user-full-order.component';
import { MessageDetailsComponent } from './message-details/message-details.component';

const routes: Routes = [
  {
    path: 'profile/:id',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'completed/:id',
    canActivate: [AuthGuard],
    component: UserFullOrderComponent
  },
  {
    path: 'message/details/:id',
    canActivate: [AuthGuard],
    component: MessageDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {}
