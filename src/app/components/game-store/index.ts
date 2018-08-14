import { CreateGameComponent } from './create-game/create-game.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { DetailsGameComponent } from './details-game/details-game.component';
import { CreateCommentGameComponent } from './create-comment-game/create-comment-game.component';
import { AllCommentsGameComponent } from './all-comments-game/all-comments-game.component';
import { DeleteCommentComponent } from '../shared/delete-comment/delete-comment.component';
import { AddToCartComponent } from '../shared/add-to-cart/add-to-cart.component';
import { CategoriesComponent } from '../shared/categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { SubscribeButtonComponent } from '../shared/subscribe-button/subscribe-button.component';

export const gameStoreComponents = [
  CreateGameComponent,
  AllGamesComponent,
  DetailsGameComponent,
  CreateCommentGameComponent,
  AllCommentsGameComponent,
  DeleteCommentComponent,
  AddToCartComponent,
  CategoriesComponent,
  CartComponent,
  SubscribeButtonComponent
];
