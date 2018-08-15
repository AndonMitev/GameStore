import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserFullOrderComponent } from './components/user/user-full-order/user-full-order.component';
//Modules
import { GameStoreModule } from './components/game-store/game-store.module';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    loadChildren: './components/user/user.module#UserModule'
  },
  {
    path: 'game',
    loadChildren: './components/game-store/game-store.module#GameStoreModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [HomeComponent],
  exports: [RouterModule]
})
export class AppRoutingModule {}
