import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

//Service
import { UserLogoutService } from '../../../core/services/authentication/logout.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {
  public showSpinner: boolean;
  private subscription$: Subscription;

  constructor(
    private user: UserLogoutService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.subscription$ = this.user.logoutUser().subscribe(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
      this.showSpinner = false;
      this.toast.success('You have been successfully logged out!');
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
