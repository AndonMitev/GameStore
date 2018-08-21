import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SubscribeToGameComponent } from './subscribe-to-game/subscribe-to-game.component';
import { UnsubscribeFromGameComponent } from './unsubscribe-from-game/unsubscribe-from-game.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Directives
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { UniqueUsernameValidatorDirective } from './directives/username.directive';

//Pipes
import { FilterPipe } from './pipes/filter.pipe';

export const sharedComponentsImp = [
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
  NotFoundComponent
];
