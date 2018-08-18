import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

//Service
import { GetProfileService } from '../../../core/services/profile-services/get-profile.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { RegisterInputModel } from '../../../core/models/input-models/register.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userData$: Observable<RegisterInputModel>;
  public showOrders: boolean;
  public showSubscriptions: boolean;
  public showComments: boolean;
  public showMessages: boolean;
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    private profileService: GetProfileService,
    private store: Store<AppState>,
    private actRoute: ActivatedRoute
  ) {
    this.showOrders = false;
    this.showSubscriptions = false;
    this.showComments = false;
    this.showMessages = false;
    this.showSpinner = true;
  }

  ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const USER_ID: string = res['params']['id'];

      this.profileService.getProfile(USER_ID).subscribe(res => {
        this.userData$ = this.store.pipe(
          select((state: AppState) => state.users.user)
        );
        this.showSpinner = false;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showComponent(param: string): void {
    switch (param) {
      case 'orders':
        this.showOrders = true;
        this.showSubscriptions = false;
        this.showComments = false;
        this.showMessages = false;
        break;
      case 'subscriptions':
        this.showOrders = false;
        this.showSubscriptions = true;
        this.showComments = false;
        this.showMessages = false;
        break;
      case 'comments':
        this.showOrders = false;
        this.showSubscriptions = false;
        this.showComments = true;
        this.showMessages = false;
        break;
      case 'messages':
        this.showOrders = false;
        this.showSubscriptions = false;
        this.showComments = false;
        this.showMessages = true;
        break;
    }
  }
}
