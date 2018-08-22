import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

//Service
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';
import { GetMessageDetailsService } from '../../../core/services/message-services/get-message-details.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

@Component({
  selector: 'my-message-details',
  templateUrl: './my-message-details.component.html',
  styleUrls: ['./my-message-details.component.css']
})
export class MyMessageDetailsComponent implements OnInit, OnDestroy {
  public messageDetails$: Observable<CreateMessageInputModel>;
  private subscription: Subscription;

  constructor(
    public verification: UserVerificationService,
    private actRoute: ActivatedRoute,
    private store: Store<AppState>,
    private messageService: GetMessageDetailsService
  ) {}

  public ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const MESSAGE_ID: string = res['params']['id'];

      this.messageService
        .getMessageDetails(MESSAGE_ID)
        .subscribe(
          () =>
            (this.messageDetails$ = this.store.pipe(
              select((state: AppState) => state.messages.details)
            ))
        );
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
