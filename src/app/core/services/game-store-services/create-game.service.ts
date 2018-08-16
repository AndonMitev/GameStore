import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Service
import { HttpServices } from '../http.services';
//Model
import { CreateGameInputModel } from '../../models/input-models/create-game.model';
import { RequestCache } from '../request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {
  constructor(private http: HttpServices, private cache: RequestCache) {}

  createGame(gameData: CreateGameInputModel): Observable<Object> {
    this.cache.cache.clear();
    return this.http.post<CreateGameInputModel>(
      gameData,
      'gamestore',
      'appdata'
    );
  }
}
