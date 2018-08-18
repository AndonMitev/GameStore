import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GetReceivedMessagesService } from '../../../core/services/message-services/get-received-messages.service';
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.css']
})
export class RecievedMessagesComponent implements OnInit {
  public receivedMessages$: Observable<CreateMessageInputModel[]>;

  constructor(
    private store: Store<AppState>,
    private msgService: GetReceivedMessagesService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.actRoute.paramMap.subscribe(res => {
      const SENDER_ID = res['params']['id'];
      console.log(SENDER_ID);
      this.msgService
        .getReceivedMessages(SENDER_ID)
        .subscribe(
          () =>
            (this.receivedMessages$ = this.store.pipe(
              select(state => state.messages.recievedMessages)
            ))
        );
    });
  }
}
