import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';

//Service
import { UserLogoutService } from '../../../core/services/authentication-services/logout.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {
  public showSpinner: boolean;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserLogoutService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.userService
      .logoutUser()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
        this.showSpinner = false;
        this.toast.success('You have been successfully logged out!');
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
