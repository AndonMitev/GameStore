import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

//Services
import { UserVerificationService } from '../../../core/services/authentication/verification.service';
import { GetUserIdByUsernameService } from '../../../core/services/profile-services/get-user-id-by-username.service';
import { CreateMessageService } from '../../../core/services/message-services/create-message.service';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { GetAllUserMessagesService } from '../../../core/services/message-services/get-sent-messages.service';
import { GetReceivedMessagesService } from '../../../core/services/message-services/get-received-messages.service';

@Component({
  selector: 'create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit, OnDestroy {
  public messageForm: FormGroup;
  private subscription: Subscription;
  private messageModel: CreateMessageInputModel;

  constructor(
    public verification: UserVerificationService,
    private fb: FormBuilder,
    private createMessageService: CreateMessageService,
    private getUserId: GetUserIdByUsernameService,
    private toast: ToastrService,
    private actRoute: ActivatedRoute,
    private getSentMsg: GetAllUserMessagesService,
    private getReceivedMsg: GetReceivedMessagesService
  ) {}

  public ngOnInit(): void {
    this.initializeMessageForm();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public initializeMessageForm(): void {
    this.messageForm = this.fb.group({
      recipient: [''],
      title: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(25)]
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100)
        ]
      ]
    });
  }

  public submitMessageForm(): void {
    const RECIPIENT: string = this.messageForm.value['recipient'] || 'Admin';
    const FROM: string = localStorage.getItem('username');
    const TITLE: string = this.messageForm.value['title'];
    const CONTENT: string = this.messageForm.value['content'];

    this.subscription = this.getUserId
      .getUserIdByUsername(RECIPIENT)
      .subscribe(res => {
        const RECIPIENT_ID: string = res[0]['_id'];
        this.actRoute.paramMap.subscribe(res => {
          const FROM_ID = res['params']['id'];

          this.messageModel = new CreateMessageInputModel(
            FROM,
            RECIPIENT,
            TITLE,
            CONTENT,
            RECIPIENT_ID,
            FROM_ID
          );

          this.createMessageService
            .createNewMessage(this.messageModel)
            .subscribe(() => {
              this.initializeMessageForm();
              this.toast.success(`Message successfully send!`);
              this.getSentMsg.getSentMessages(FROM_ID).subscribe();
              //this.getReceivedMsg.getReceivedMessages(FROM_ID).subscribe(); PIECE OF 5#17777
            });
        });
      });
  }

  public get title(): AbstractControl {
    return this.messageForm.get('title');
  }

  public get recipient(): AbstractControl {
    return this.messageForm.get('recipient');
  }

  public get content(): AbstractControl {
    return this.messageForm.get('content');
  }
}
