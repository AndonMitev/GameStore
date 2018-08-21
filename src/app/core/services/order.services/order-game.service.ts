import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

//State
import { AppState } from '../../../store/app.state';
//Action
import {
  OrderGame,
  GetAllOrderedGames,
  DeleteGameFromOrderedList
} from '../../../store/actions/order.actions';
//Model
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderGameService {
  private game: CompleteOrderModel;

  constructor(private store: Store<AppState>) {}

  public orderGame(
    index,
    gameId: string,
    title: string,
    price: number,
    image: string
  ): void {
    this.game = new CompleteOrderModel(gameId, title, price, image);
    gameId = gameId + 'custKey';
    sessionStorage.setItem(gameId, JSON.stringify(this.game));
    this.store.dispatch(new OrderGame(this.game));
  }

  viewOrder(): void {
    const ALL_GAMES = [];
    for (let k in sessionStorage) {
      if (k.endsWith('custKey')) {
        ALL_GAMES.push(JSON.parse(sessionStorage[k]));
      }
    }
    this.store.dispatch(new GetAllOrderedGames(ALL_GAMES));
  }

  deleteGame(gameId: string): void {
    sessionStorage.removeItem(gameId + 'custKey');
    this.store.dispatch(new DeleteGameFromOrderedList(gameId));
  }
}
