import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { sharedComponentsImp } from './import-shared-components';
import { sharedComponentsEx } from './export-shared-components';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [...sharedComponentsImp],
  exports: [...sharedComponentsEx]
})
export class SharedModule {}
