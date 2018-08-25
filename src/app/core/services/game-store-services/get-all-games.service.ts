import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { AllGamesModel } from '../../models/view-models/all-games.model';
//Action
import { GetAllGamesAction } from '../../../store/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GetAllGamesService {
  constructor(private method: GetMethod, private store: Store<AppState>) {}

  public getAllGames(selectedPlatform: string): Observable<void> {
    let correctQuery: string = 'gamestore';

    if (selectedPlatform) {
      correctQuery =
        correctQuery +
        `?query={"selectedPlatform":"${selectedPlatform}"}&sort={"_kmd.ect": -1}`;
    }

    return this.method.get<AllGamesModel[]>(correctQuery, 'appdata').pipe(
      map((res: AllGamesModel[]) => {
        this.store.dispatch(new GetAllGamesAction(res));
      })
    );
  }
}
