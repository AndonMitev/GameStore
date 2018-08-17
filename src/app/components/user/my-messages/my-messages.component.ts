import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GetAllUserMessagesService } from '../../../core/services/message-services/get-user-messages.service';
import { Store, select } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';
import { Observable, Subscription } from '../../../../../node_modules/rxjs';
import { UserVerificationService } from '../../../core/services/authentication/verification.service';

@Component({
  selector: 'my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit, OnDestroy {
  public userMessages$: Observable<CreateMessageInputModel[]>;
  private subscription: Subscription;

  constructor(
    private messageService: GetAllUserMessagesService,
    private actRoute: ActivatedRoute,
    private store: Store<AppState>,
    private verification: UserVerificationService
  ) {}

  ngOnInit(): void {
    const USER_ID: string = localStorage.getItem('username');

    this.subscription = this.messageService
      .getAllUserMessages(USER_ID)
      .subscribe(
        () =>
          (this.userMessages$ = this.store.pipe(
            select(state => state.messages.all)
          ))
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
