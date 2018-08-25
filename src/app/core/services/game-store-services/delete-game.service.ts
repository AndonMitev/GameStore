import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//CRUD Method
import { DeleteMethod } from '../crud-methods/delete-method.service';
//State
import { AppState } from '../../../store/app.state';
//Action
import { DeleteGameAction } from '../../../store/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class DeleteGameService {
  constructor(private method: DeleteMethod, private store: Store<AppState>) {}

  public deleteGame(id: string): Observable<void> {
    return this.method
      .delete(`gamestore/${id}`, 'appdata')
      .pipe(map(() => this.store.dispatch(new DeleteGameAction(id))));
  }
}
