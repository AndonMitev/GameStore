import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//Model
import { DetailsGameModel } from '../../models/view-models/details-game.model';
//State
import { AppState } from '../../../store/app.state';
//Action
import { GetDetailsGameAction } from '../../../store/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsGameService {
  constructor(private http: GetMethod, private store: Store<AppState>) {}

  public getGameDetails(id: string): Observable<void> {
    return this.http.get<DetailsGameModel>(`gamestore/${id}`, 'appdata').pipe(
      map((res: DetailsGameModel) => {
        this.store.dispatch(new GetDetailsGameAction(res));
      })
    );
  }
}
