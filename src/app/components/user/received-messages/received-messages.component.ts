import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

//Services
import { GetReceivedMessagesService } from '../../../core/services/message-services/get-received-messages.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

@Component({
  selector: 'received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.css']
})
export class RecievedMessagesComponent implements OnInit, OnDestroy {
  public receivedMessages$: Observable<CreateMessageInputModel[]>;
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private msgService: GetReceivedMessagesService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const SENDER_ID: string = res['params']['id'];

      this.msgService
        .getReceivedMessages(SENDER_ID)
        .subscribe(
          () =>
            (this.receivedMessages$ = this.store.pipe(
              select((state: AppState) => state.messages.recievedMessages)
            ))
        );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
