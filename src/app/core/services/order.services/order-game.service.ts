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

  constructor(
    private localStorage: LocalStorage,
    private store: Store<AppState>
  ) {
    this.games = [];
  }

  orderGame(game: CompleteOrderModel): Observable<void> {
    this.games.push(game);
    return this.localStorage.setItem('order', this.games).pipe(
      map(() => {
        this.store.dispatch(new OrderGame(game));
      })
    );
  }

  viewOrder(): Observable<void> {
    return this.localStorage.getItem('order').pipe(
      map((res: CompleteOrderModel[]) => {
        this.store.dispatch(new GetAllOrderedGames(res));
      })
    );
  }

  deleteGame(index) {
    return this.localStorage.getItem('order').pipe(
      map(() => {
        this.store.dispatch(new DeleteGameFromOrderedList(index));
      })
    );
  }
}
