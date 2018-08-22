import { Injectable } from '@angular/core';
import { PutMethod } from '../crud-methods/put-method.service';
import { DetailsGameComponent } from '../../../components/game-store/details-game/details-game.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { map } from 'rxjs/operators';
import { DetailsGameModel } from '../../models/view-models/details-game.model';
import { GetDetailsGameAction } from '../../../store/actions/game.actions';
import { CreateGameInputModel } from '../../models/input-models/create-game.model';

@Injectable({
  providedIn: 'root'
})
export class EditGameService {
  constructor(private http: PutMethod, private store: Store<AppState>) {}

  editGame(game: CreateGameInputModel, gameId: string) {
    return this.http
      .put(game, `gamestore/${gameId}`, 'appdata')
      .pipe(
        map((res: CreateGameInputModel) =>
          this.store.dispatch(new GetDetailsGameAction(res))
        )
      );
  }
}
