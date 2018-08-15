import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Router } from '@angular/router';

import { UserVerificationService } from '../services/authentication/verification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userServices: UserVerificationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkIfUserIsLoggedIn();
  }

  checkIfUserIsLoggedIn() {
    if (this.userServices.hasUser()) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
