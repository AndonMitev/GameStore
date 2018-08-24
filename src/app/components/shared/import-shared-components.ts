import { NavbarComponent } from './navbar/navbar.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { SpinnerComponent } from './loading-spinner/loading-spinner.component';
import { UnsubscribeFromGameComponent } from './unsubscribe-from-game/unsubscribe-from-game.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Directives
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { UniqueUsernameValidatorDirective } from './directives/username.directive';

//Pipes
import { FilterPipe } from './pipes/filter.pipe';


export const sharedComponentsImp = [
  NavbarComponent,
  AddToCartComponent,
  CategoriesComponent,
  DeleteCommentComponent,
  SpinnerComponent,
  UnsubscribeFromGameComponent,
  CompareValidatorDirective,
  UniqueUsernameValidatorDirective,
  FilterPipe,
  NotFoundComponent,
];
