import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
//Guards
import { AuthGuard } from './core/guards/auth.guard';
import { UnAuthGuard } from './core/guards/un-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'register',
    canActivate: [UnAuthGuard],
    component: RegisterComponent
  },
  {
    path: 'login',
    canActivate: [UnAuthGuard],
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
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
