import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GetUserIdByUsernameService } from '../../../core/services/profile-services/get-user-id-by-username.service';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit, OnDestroy {
  public searchUserForm: FormGroup;
  public isFoundedUser: boolean;
  public buttonText: string;
  public isClicked: boolean;
  public resultOfSearchMessage: string;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private profileService: GetUserIdByUsernameService,
    private router: Router
  ) {
    this.isFoundedUser = true;
    this.buttonText = 'Search';
    this.isClicked = false;
  }

  public ngOnInit(): void {
    this.initializeSearchUserForm();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public initializeSearchUserForm(): void {
    this.searchUserForm = this.fb.group({
      username: ''
    });
  }

  public submitSearchUserForm(): void {
    this.buttonText = 'Processing...';
    this.isClicked = true;
    const USERNAME = this.searchUserForm.value['username'];
    this.profileService
      .getUserIdByUsername(USERNAME)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        if (!res[0]) {
          this.resultOfSearchMessage = `There is no user with username: ${USERNAME}`;
          this.isFoundedUser = false;
          this.buttonText = 'Search';
          this.isClicked = false;
          return;
        }

        const USER_ID = res[0]._id;
        this.buttonText = 'Search';
        this.isClicked = false;
        this.isFoundedUser = true;
        this.router.navigate([`/user/profile/${USER_ID}`]);
      });
  }
}
