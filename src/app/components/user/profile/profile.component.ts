import { Component, OnInit } from '@angular/core';
import { GetProfileService } from '../../../core/services/profile-services/get-profile.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData$;
  public showOrders: boolean;
  public showSubscriptions: boolean;
  public showComments: boolean;
  public showMessages: boolean;
  public showSpinner: boolean;

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

  ngOnInit() {
    this.actRoute.paramMap.subscribe(res => {
      const USER_ID = res['params']['id'];
      this.profileService.getProfile(USER_ID).subscribe(res => {
        this.userData$ = this.store.pipe(select(state => state.users.user));
        this.showSpinner = false;
      });
    });
  }

  showComponent(param) {
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
