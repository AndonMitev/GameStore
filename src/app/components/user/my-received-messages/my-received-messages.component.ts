import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

//Services
import { GetReceivedMessagesService } from '../../../core/services/message-services/get-received-messages.service';
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'my-received-messages',
  templateUrl: './my-received-messages.component.html',
  styleUrls: ['./my-received-messages.component.css']
})
export class MyRecievedMessagesComponent implements OnInit, OnDestroy {
  public receivedMessages$: Observable<CreateMessageInputModel[]>;
  public currPage: number;
  public pageSize: number;
  public showSpinner: boolean;
  private subscription: Subscription;

  constructor(
    public verification: UserVerificationService,
    private store: Store<AppState>,
    private messageService: GetReceivedMessagesService,
    private actRoute: ActivatedRoute
  ) {
    this.showSpinner = true;
    this.currPage = 1;
    this.pageSize = 4;
  }

  public ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const SENDER_ID: string = res['params']['id'];

      this.messageService.getReceivedMessages(SENDER_ID).subscribe(() => {
        this.receivedMessages$ = this.store.pipe(
          select((state: AppState) => state.messages.recievedMessages)
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
