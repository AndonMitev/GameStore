import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgArrayPipesModule, NgStringPipesModule } from 'angular-pipes';
//Components
import { sharedComponentsImp } from './import-shared-components';
import { sharedComponentsEx } from './export-shared-components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgArrayPipesModule,
    NgStringPipesModule
  ],
  declarations: [...sharedComponentsImp],
  exports: [...sharedComponentsEx]
})
export class SharedModule {}
