import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

//Service
import { GetAllUserMessagesService } from '../../../core/services/message-services/get-sent-messages.service';
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

@Component({
  selector: 'my-sent-messages',
  templateUrl: './my-sent-messages.component.html',
  styleUrls: ['./my-sent-messages.component.css']
})
export class MySentMessages implements OnInit, OnDestroy {
  public sentMessages$: Observable<CreateMessageInputModel[]>;
  public currPage: number;
  public pageSize: number;
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    public verification: UserVerificationService,
    private messageService: GetAllUserMessagesService,
    private actRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.showSpinner = true;
    this.currPage = 1;
    this.pageSize = 3;
  }

  public ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const USER_ID: string = res['params']['id'];

      this.messageService.getSentMessages(USER_ID).subscribe(() => {
        this.sentMessages$ = this.store.pipe(
          select((state: AppState) => state.messages.sentMessages)
        );

        this.showSpinner = false;
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
