import { Component, OnInit } from '@angular/core';
import { GetProfileService } from '../../../core/services/profile-services/get-profile.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userData$;
  private showOrders: boolean;
  private showSubscriptions: boolean;
  private showComments: boolean;

  constructor(
    private profileService: GetProfileService,
    private store: Store<AppState>
  ) {
    this.showOrders = true;
    this.showSubscriptions = false;
    this.showComments = false;
  }

  ngOnInit() {
    const USER_ID = localStorage.getItem('userId');
    this.profileService.getProfile(USER_ID).subscribe(res => {
      this.userData$ = this.store.pipe(select(state => state.users.user));
    });
  }

  showComponent(param) {
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
