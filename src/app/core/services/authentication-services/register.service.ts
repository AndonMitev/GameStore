import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//CRUD Method
import { PostMethod } from '../crud-methods/post-method.service';
//Model
import { RegisterInputModel } from '../../models/input-models/register.model';
import { UserVerificationService } from './verification.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  constructor(
    private method: PostMethod,
    private observeToken: UserVerificationService
  ) {}

  public registerUser(userData: RegisterInputModel): Observable<Object> {
    return this.method.post<RegisterInputModel>(userData, '', 'user');
  }

  public checkIfUsernameExists(userData: Object): Observable<Object> {
    return this.method.post<Object>(userData, 'check-username-exists', 'rpc');
  }

  public saveData(userData): void {
    this.observeToken.saveUserData(userData);
  }
}
