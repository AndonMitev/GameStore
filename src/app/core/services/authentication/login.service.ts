import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpServices } from '../http.services';
//Model
import { LoginInputModel } from '../../models/input-models/login.model';
import { UserVerificationService } from './verification.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(
    private http: HttpServices,
    private observeToken: UserVerificationService
  ) {}

  loginUser(userData: LoginInputModel): Observable<Object> {
    return this.http.post<LoginInputModel>(userData, 'login', 'user');
  }

  saveData(userData): void {
    this.observeToken.saveUserData(userData);
  }
}
