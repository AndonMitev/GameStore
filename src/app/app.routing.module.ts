import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { CartComponent } from './components/game-store/cart/cart.component';
//Modules
import { GameStoreModule } from './components/game-store/game-store.module';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserFullOrderComponent } from './components/user/user-full-order/user-full-order.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user/cart', component: CartComponent },
  {
    path: 'game',
    loadChildren: () => GameStoreModule
  },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/completed', component: UserFullOrderComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [HomeComponent],
  exports: [RouterModule]
})
export class AppRoutingModule {}
