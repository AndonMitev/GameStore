import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//Services
import { HttpServices } from '../http.services';
//Model
import { DetailsGameModel } from '../../models/view-models/details-game.model';
//State
import { AppState } from '../../../store/app.state';
//Action
import { GetDetailsGame } from '../../../store/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class GetDetailsGameService {
  constructor(private http: HttpServices, private store: Store<AppState>) {}

  public getGameById(id: string): Observable<void> {
    return this.http.get<DetailsGameModel>(`gamestore/${id}`, 'appdata').pipe(
      map((res: DetailsGameModel) => {
        this.store.dispatch(new GetDetailsGame(res));
      })
    );
  }
}
