import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

//Modules
import { GameStoreRoutingModule } from './game-store.routing.module';
import { SharedModule } from '../shared/shared.module';

//Components
import { gameStoreComponentsImp } from './import-game-store-components';
import { gameStoreComponentsExp } from './export-game-store-components';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameStoreRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [...gameStoreComponentsImp],
  exports: [...gameStoreComponentsExp]
})
export class GameStoreModule {}
