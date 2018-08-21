import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';
import { UserVerificationService } from './verification.service';
//Model
import { LoginInputModel } from '../../models/input-models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(
    private http: PostMethod,
    private observeToken: UserVerificationService
  ) {}

  public loginUser(userData: LoginInputModel): Observable<Object> {
    return this.http.post<LoginInputModel>(userData, 'login', 'user');
  }

  public saveData(userData): void {
    this.observeToken.saveUserData(userData);
  }
}
