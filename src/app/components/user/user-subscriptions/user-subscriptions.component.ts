import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

//Service
import { GetUserSubscriptionsService } from '../../../core/services/profile-services/get-user-subscrptions.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';

@Component({
  selector: 'user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit, OnDestroy {
  public userSubscriptions$: CompleteOrderModel[];
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    private userSubs: GetUserSubscriptionsService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.showSpinner = true;
  }

  ngOnInit() {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const USER_ID = res['params']['id'];

      this.userSubs.getUserSubscriptions(USER_ID).subscribe(() => {
        this.store
          .pipe(select((state: AppState) => state.users.subscriptions))
          .subscribe(res => (this.userSubscriptions$ = res));
        this.showSpinner = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
