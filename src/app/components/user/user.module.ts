import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Custom Modules
import { SharedModule } from '../shared/shared.module';
import { UserRouterModule } from './user-routing.module';
//Components

import { userComponentsImp } from './import-user-components';
import { userComponentsEx } from './export-user-components';


@NgModule({
  imports: [
    CommonModule,
    UserRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [...userComponentsImp],
  exports: [...userComponentsEx]
})
export class UserModule {}
