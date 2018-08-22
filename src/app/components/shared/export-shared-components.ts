import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SubscribeToGameComponent } from './subscribe-to-game/subscribe-to-game.component';
import { UnsubscribeFromGameComponent } from './unsubscribe-from-game/unsubscribe-from-game.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Directives
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { UniqueUsernameValidatorDirective } from './directives/username.directive';
//Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from 'angular-pipes';

export const sharedComponentsEx = [
  AddToCartComponent,
  CategoriesComponent,
  DeleteCommentComponent,
  FooterComponent,
  NavbarComponent,
  SpinnerComponent,
  SubscribeToGameComponent,
  UnsubscribeFromGameComponent,
  CompareValidatorDirective,
  UniqueUsernameValidatorDirective,
  FilterPipe,
  NotFoundComponent,
  OrderByPipe
];
