import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Service
import { GetProfileService } from '../../../core/services/profile-services/get-profile.service';
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { RegisterInputModel } from '../../../core/models/input-models/register.model';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  public userData$: Observable<RegisterInputModel>;

  public showOrders: boolean;
  public showSubscriptions: boolean;
  public showComments: boolean;
  public showSpinner: boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public verification: UserVerificationService,
    private profileService: GetProfileService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.showOrders = false;
    this.showComments = false;
    this.showSubscriptions = false;
    this.showSpinner = true;
  }

  public ngOnInit(): void {
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const USER_ID: string = res['params']['id'];

        this.profileService
          .getProfile(USER_ID)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.userData$ = this.store.pipe(
              select((state: AppState) => state.users.user),
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

  public showComponent(param: string): void {
    switch (param) {
      case 'orders':
        this.showOrders = true;
        this.showSubscriptions = false;
        this.showComments = false;
        break;
      case 'subscriptions':
        this.showOrders = false;
        this.showSubscriptions = true;
        this.showComments = false;
        break;
      case 'comments':
        this.showOrders = false;
        this.showSubscriptions = false;
        this.showComments = true;
        break;
    }
  }
}
