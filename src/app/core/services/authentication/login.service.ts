import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Services
import { HttpServices } from '../http.services';
import { UserVerificationService } from './verification.service';
//Model
import { LoginInputModel } from '../../models/input-models/login.model';

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
