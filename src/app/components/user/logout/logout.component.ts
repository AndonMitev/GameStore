import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

//Service
import { UserLogoutService } from '../../../core/services/authentication/logout.service';

import { AppState } from '../../../store/app.state';
import { GetAllOrderedGames } from '../../../store/actions/order.actions';

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
    private toast: ToastrService,
    private store: Store<AppState>
  ) {
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.subscription$ = this.user.logoutUser().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.store.dispatch(new GetAllOrderedGames([]));
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
