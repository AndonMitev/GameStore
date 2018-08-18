import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Components
import { sharedComponentsImp } from './import-shared-components';
import { sharedComponentsEx } from './export-shared-components';


@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...sharedComponentsImp],
  exports: [...sharedComponentsEx]
})
export class SharedModule {}
