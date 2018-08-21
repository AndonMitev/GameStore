import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CRUD Method
import { GetMethod } from '../crud-methods/get-method.service';
//Model
import { RegisterInputModel } from '../../models/input-models/register.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserIdByUsernameService {
  constructor(private http: GetMethod) {}

  public getUserIdByUsername(username: string): Observable<Object> {
    return this.http.get<RegisterInputModel>(
      `?query={"username":"${username}"}`,
      'user'
    );
  }
}
