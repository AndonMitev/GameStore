import { NavbarComponent } from './navbar/navbar.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { SpinnerComponent } from './loading-spinner/loading-spinner.component';
import { UnsubscribeFromGameComponent } from './unsubscribe-from-game/unsubscribe-from-game.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Directives
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { UniqueUsernameValidatorDirective } from './directives/username.directive';
//Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from 'angular-pipes';
import { TruncatePipe } from 'angular-pipes';

export const sharedComponentsEx = [
  AddToCartComponent,
  CategoriesComponent,
  DeleteCommentComponent,
  NavbarComponent,
  SpinnerComponent,
  UnsubscribeFromGameComponent,
  CompareValidatorDirective,
  UniqueUsernameValidatorDirective,
  FilterPipe,
  NotFoundComponent,
  OrderByPipe,
  TruncatePipe
];
