import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';
//Model
import { CreateGameInputModel } from '../../models/input-models/create-game.model';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {
  constructor(private method: PostMethod) {}

  public createGame(gameData: CreateGameInputModel): Observable<Object> {
    return this.method.post<CreateGameInputModel>(
      gameData,
      'gamestore',
      'appdata'
    );
  }
}
