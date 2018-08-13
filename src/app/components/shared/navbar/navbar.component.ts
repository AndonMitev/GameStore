import { Component } from '@angular/core';

//Verification service used to check if user is logged in and hide/show correct links
import { UserVerificationService } from '../../../core/services/authentication/verification.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userVerification: UserVerificationService) {}
}
