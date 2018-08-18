import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMessageDetailsService } from '../../../core/services/message-services/get-message-details';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

@Component({
  selector: 'message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  public messageDetails$: Observable<CreateMessageInputModel>;

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<AppState>,
    private messageDetailsService: GetMessageDetailsService
  ) {}

  ngOnInit() {
    this.actRoute.paramMap.subscribe(res => {
      const MESSAGE_ID = res['params']['id'];
      this.messageDetailsService
        .getMessageDetails(MESSAGE_ID)
        .subscribe(
          () =>
            (this.messageDetails$ = this.store.pipe(
              select(state => state.messages.details)
            ))
        );
    });
  }
}
