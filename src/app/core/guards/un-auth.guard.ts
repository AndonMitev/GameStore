import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { UserVerificationService } from '../services/authentication-services/verification.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(
    private authService: UserVerificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkIfUserIsLoggedIn();
  }

  checkIfUserIsLoggedIn(): boolean {
    if (!this.authService.hasUser()) {
      return true;
    }
    this.router.navigate(['/game/all']);
  }
}
