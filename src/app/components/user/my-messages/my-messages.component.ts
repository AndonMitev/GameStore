import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

//Service
import { GetAllUserMessagesService } from '../../../core/services/message-services/get-sent-messages.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

@Component({
  selector: 'my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit, OnDestroy {
  public sentMessages$: Observable<CreateMessageInputModel[]>;
  public currPage: number;
  public pageSize: number;
  private subscription: Subscription;

  constructor(
    private messageService: GetAllUserMessagesService,
    private actRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.currPage = 1;
    this.pageSize = 3;
  }

  public ngOnInit(): void {
    this.actRoute.paramMap.subscribe((res: ParamMap) => {
      const USER_ID: string = res['params']['id'];

      this.subscription = this.messageService
        .getSentMessages(USER_ID)
        .subscribe(() => {
          this.sentMessages$ = this.store.pipe(
            select((state: AppState) => state.messages.sentMessages)
          );
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
