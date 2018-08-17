import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';

//Services
import { UserVerificationService } from '../../../core/services/authentication/verification.service';
import { CreateMessageService } from '../../../core/services/message-services/create-message.service';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

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
    private fb: FormBuilder,
    private verification: UserVerificationService,
    private createMessageService: CreateMessageService
  ) {}

  ngOnInit(): void {
    this.initializeMessageForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initializeMessageForm(): void {
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

  submitMessageForm() {
    const RECIPIENT =
      this.messageForm.value['recipient'] || 'Admin'
    const TITLE = this.messageForm.value['title'];
    const CONTENT = this.messageForm.value['content'];

    this.messageModel = new CreateMessageInputModel(RECIPIENT, TITLE, CONTENT);

    this.subscription = this.createMessageService
      .createNewMessage(this.messageModel)
      .subscribe();
  }

  get title(): AbstractControl {
    return this.messageForm.get('title');
  }

  get recipient(): AbstractControl {
    return this.messageForm.get('recipient');
  }

  get content(): AbstractControl {
    return this.messageForm.get('content');
  }
}
