import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UserOrdersComponent } from './user-orders/user-orders.component';

 /*const routes: Routes = [
  {
    path: 'user/orders',
    canActivate: [AuthGuard],
    component: UserOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {} */
