import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Service
import { HttpServices } from '../http.services';
//Model
import { CreateGameInputModel } from '../../models/input-models/create-game.model';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {
  constructor(private http: HttpServices) {}

  public createGame(gameData: CreateGameInputModel): Observable<Object> {
    return this.http.post<CreateGameInputModel>(
      gameData,
      'gamestore',
      'appdata'
    );
  }
}
