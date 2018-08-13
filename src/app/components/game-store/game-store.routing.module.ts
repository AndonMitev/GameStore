import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { CreateGameComponent } from './create-game/create-game.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { DetailsGameComponent } from './details-game/details-game.component';

//Guards
import { AdminGuard } from '../../core/guards/admin.guard';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'create',
    canActivate: [AuthGuard, AdminGuard],
    component: CreateGameComponent
  },
  {
    path: 'all',
    canActivate: [AuthGuard],
    component: AllGamesComponent
  },
  {
    path: 'details/:id',
    canActivate: [AuthGuard],
    component: DetailsGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameStoreRoutingModule {}
