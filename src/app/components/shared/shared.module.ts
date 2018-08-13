import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
//Module
import { AppRoutingModule } from '../../app.routing.module';

//Directives
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { UniqueUsernameValidatorDirective } from './directives/username.directive';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [
    NavbarComponent,
    FooterComponent,
    CompareValidatorDirective,
    UniqueUsernameValidatorDirective
  ],
  exports: [NavbarComponent, FooterComponent]
})
export class SharedModule {}
