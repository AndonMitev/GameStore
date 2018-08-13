import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { gameStoreComponents } from '.';
//Modules
import { GameStoreRoutingModule } from './game-store.routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, GameStoreRoutingModule],
  declarations: [...gameStoreComponents]
})
export class GameStoreModule {}
