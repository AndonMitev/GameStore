import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GetMessageDetailsService } from '../../../core/services/message-services/get-message-details.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable, Subscription } from 'rxjs';
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

@Component({
  selector: 'message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  public messageDetails$: Observable<CreateMessageInputModel>;
  private subscription: Subscription;

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<AppState>,
    private messageDetailsService: GetMessageDetailsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const MESSAGE_ID: string = res['params']['id'];

      this.messageDetailsService
        .getMessageDetails(MESSAGE_ID)
        .subscribe(
          () =>
            (this.messageDetails$ = this.store.pipe(
              select((state: AppState) => state.messages.details)
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
