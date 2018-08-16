import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Model
import { AllGamesModel } from '../../models/view-models/all-games.model';
//Service
import { HttpServices } from '../http.services';
//Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetAllGames } from '../../../store/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GetAllGamesService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  getAllGames(selectedPlatform: string): Observable<void> {
    let correctQuery: string = 'gamestore';

    if (selectedPlatform) {
      correctQuery =
        correctQuery +
        `?query={"selectedPlatform":"${selectedPlatform}"}&sort={"_kmd.ect": -1}`;
    }

    return this.http.get<AllGamesModel[]>(correctQuery, 'appdata').pipe(
      map((res: AllGamesModel[]) => {
        this.store.dispatch(new GetAllGames(res));
      })
    );
  }
}
