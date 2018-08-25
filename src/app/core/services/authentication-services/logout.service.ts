import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutService {
  constructor(private method: PostMethod) {}

  public logoutUser(): Observable<Object> {
    return this.method.post(undefined, '_logout', 'user');
  }
}
