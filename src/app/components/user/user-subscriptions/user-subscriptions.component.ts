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

import { EditGameService } from '../../../core/services/game-store-services/edit-game.service';

@Component({
  selector: 'user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit, OnDestroy {
  public userSubscriptions$: CompleteOrderModel[];
  public showSpinner: boolean;
  private subscription: Subscription;
  private userId;
  string;

  constructor(
    private userSubs: GetUserSubscriptionsService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute,
    private edit: EditGameService
  ) {
    this.showSpinner = true;
  }

  ngOnInit() {
    this.actRoute.paramMap.subscribe((res: ParamMap) => {
      this.userId = res['params']['id'];

      this.userSubs.getUserSubscriptions(this.userId).subscribe(() => {
        this.subscription = this.store
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
