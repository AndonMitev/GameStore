import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutService {
  constructor(private http: PostMethod) {}

  public logoutUser(): Observable<Object> {
    return this.http.post(undefined, '_logout', 'user');
  }
}
