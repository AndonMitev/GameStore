import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PreventLoggedInAccess } from './core/guards/un-auth.guard';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PreventLoggedInAccess]
  },
  {
    path: 'login',
    canActivate: [PreventLoggedInAccess],
    component: LoginComponent
  },
  { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent },
  {
    path: 'game',
    loadChildren: './components/game-store/game-store.module#GameStoreModule'
  },
  {
    path: 'user',
    loadChildren: './components/user/user.module#UserModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
