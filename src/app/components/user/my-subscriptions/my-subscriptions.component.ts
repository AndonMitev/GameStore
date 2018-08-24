import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Service
import { GetUserSubscriptionsService } from '../../../core/services/profile-services/get-user-subscrptions.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CompleteOrderModel } from '../../../core/models/view-models/complete-order.model';


@Component({
  selector: 'my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit, OnDestroy {
  public userSubscriptions$: Observable<CompleteOrderModel[]>;
  public showSpinner: boolean;
  public currPage: number;
  public pageSize: number;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public userId: string;

  constructor(
    private userSubs: GetUserSubscriptionsService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.currPage = 1;
    this.pageSize = 6;
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        this.userId = res['params']['id'];

        this.userSubs
          .getUserSubscriptions(this.userId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.userSubscriptions$ = this.store.pipe(
              select((state: AppState) => state.users.subscriptions),
              takeUntil(this.ngUnsubscribe)
            );

            this.showSpinner = false;
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
