import { Component } from '@angular/core';

//Verification service used to check if user is logged in and hide/show correct links
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  constructor(public userVerification: UserVerificationService) {}

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public getUserId(): string {
    return localStorage.getItem('userId');
  }
}
