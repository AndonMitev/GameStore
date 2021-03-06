import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Router } from '@angular/router';

//Service
import { UserVerificationService } from '../services/authentication-services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private userServices: UserVerificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkIfUserIsAdmin();
  }

  checkIfUserIsAdmin(): boolean {
    if (this.userServices.isAdmin()) {
      return true;
    }
    this.router.navigate(['/game/all']);
  }
}
