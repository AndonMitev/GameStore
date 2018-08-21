import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpServices } from '../http.services';
import { RegisterInputModel } from '../../models/input-models/register.model';
import { UserVerificationService } from './verification.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  constructor(
    private http: HttpServices,
    private observeToken: UserVerificationService
  ) {}

  public registerUser(userData: RegisterInputModel): Observable<Object> {
    return this.http.post<RegisterInputModel>(userData, '', 'user');
  }

  public checkIfUsernameExists(userData: Object): Observable<Object> {
    return this.http.post<Object>(userData, 'check-username-exists', 'rpc');
  }

  public saveData(userData): void {
    this.observeToken.saveUserData(userData);
  }
}
