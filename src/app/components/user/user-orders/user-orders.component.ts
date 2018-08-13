import { Component, OnInit } from '@angular/core';
import { GetProfileService } from '../../../core/services/profile-services/get-profile.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
