import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

//Services
import { GetReceivedMessagesService } from '../../../core/services/message-services/get-received-messages.service';
import { UserVerificationService } from '../../../core/services/authentication-services/verification.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

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
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

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
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ParamMap) => {
        const SENDER_ID: string = res['params']['id'];

        this.messageService
          .getReceivedMessages(SENDER_ID)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(() => {
            this.receivedMessages$ = this.store.pipe(
              select((state: AppState) => state.messages.recievedMessages),
              takeUntil(this.ngUnsubscribe$)
            );

            this.showSpinner = false;
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
