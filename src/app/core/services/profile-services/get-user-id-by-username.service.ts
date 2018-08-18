import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Service
import { HttpServices } from '../http.services';
//Model
import { RegisterInputModel } from '../../models/input-models/register.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserIdByUsernameService {
  constructor(private http: HttpServices) {}

  getUserIdByUsername(username: string): Observable<Object> {
    return this.http.get<RegisterInputModel>(
      `?query={"username":"${username}"}`,
      'user'
    );
  }
}
