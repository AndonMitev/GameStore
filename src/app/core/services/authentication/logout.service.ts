import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Service
import { HttpServices } from '../http.services';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutService {
  constructor(private http: HttpServices) {}

  logoutUser(): Observable<Object> {
    return this.http.post(undefined, '_logout', 'user');
  }
}
