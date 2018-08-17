import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

import { ProfileComponent } from './profile/profile.component';
import { UserFullOrderComponent } from './user-full-order/user-full-order.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {}
