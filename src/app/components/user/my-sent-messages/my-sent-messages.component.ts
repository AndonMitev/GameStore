import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public verification: UserVerificationService,
    private messageService: GetAllUserMessagesService,
    private actRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.showSpinner = true;
    this.currPage = 1;
    this.pageSize = 4;
  }

  public ngOnInit(): void {
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ParamMap) => {
        const USER_ID: string = res['params']['id'];

        this.messageService
          .getSentMessages(USER_ID)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.sentMessages$ = this.store.pipe(
              select((state: AppState) => state.messages.sentMessages),
              takeUntil(this.ngUnsubscribe)
            );

            this.showSpinner = false;
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public pageChanged(newPage: number): void {
    this.currPage = newPage;
  }
}
