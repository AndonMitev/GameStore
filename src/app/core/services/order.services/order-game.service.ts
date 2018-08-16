import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, tap, filter } from 'rxjs/operators';
//model

import { AppState } from '../../../store/app.state';

import {
  OrderGame,
  GetAllOrderedGames,
  DeleteGameFromOrderedList
} from '../../../store/actions/order.actions';
import { CompleteOrderModel } from '../../models/view-models/complete-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderGameService {
  private games: CompleteOrderModel[];
  private game: CompleteOrderModel;

  constructor(
    private localStorage: LocalStorage,
    private store: Store<AppState>
  ) {
    this.games = [];
  }

  orderGame(index, gameId, title, price, image) {
    this.game = new CompleteOrderModel(gameId, title, price, image);
    index = index.toString() + 'custKey';
    sessionStorage.setItem(index, JSON.stringify(this.game));
    this.store.dispatch(new OrderGame(this.game));
  }

  viewOrder() {
    const ALL_GAMES = [];
    for (let k in sessionStorage) {
      if (k.endsWith('custKey')) {
        ALL_GAMES.push(JSON.parse(sessionStorage[k]));
      }
    }

    /* for (let i = 0; i < sessionStorage.length; i++) {
      console.log(sessionStorage.getItem(localStorage.key(i)));
      ALL_GAMES.push(sessionStorage[i]);
    } */
    console.log(ALL_GAMES);
    this.store.dispatch(new GetAllOrderedGames(ALL_GAMES));
  }

  deleteGame(id) {
    console.log(id + 'custKey');
    sessionStorage.removeItem(id + 'custKey');
    this.store.dispatch(new DeleteGameFromOrderedList(id));
  }
}
