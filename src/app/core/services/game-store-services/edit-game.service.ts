import { Injectable } from '@angular/core';
import { HttpServices } from '../http.services';
import { CreateGameInputModel } from '../../models/input-models/create-game.model';
import { map } from '../../../../../node_modules/rxjs/operators';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { EditGame } from '../../../store/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class EditGameService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  editGame(game: CreateGameInputModel, id: string) {
    console.log(id);
    return this.http.put(game, `gamestore/${id}`, 'appdata').pipe(
      map((res: CreateGameInputModel) => {
        this.store.dispatch(new EditGame(res));
        console.log('here');
      })
    );
  }
}
