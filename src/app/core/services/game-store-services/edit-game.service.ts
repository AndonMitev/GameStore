import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Servuce
import { HttpServices } from '../http.services';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateGameInputModel } from '../../models/input-models/create-game.model';
//Action
import { EditGame } from '../../../store/actions/game.actions';
import { UnsubscribeUser } from '../../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class EditGameService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  editGame(game: CreateGameInputModel, id: string): Observable<void> {
    return this.http.put(game, `gamestore/${id}`, 'appdata').pipe(
      map((res: CreateGameInputModel) => {
        this.store.dispatch(new EditGame(res));
        this.store.dispatch(new UnsubscribeUser(id));
      })
    );
  }
}
