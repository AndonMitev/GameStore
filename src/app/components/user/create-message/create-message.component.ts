import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';

//Services
import { UserVerificationService } from '../../../core/services/authentication/verification.service';
//Model
import { CreateMessageInputModel } from '../../../core/models/input-models/message-model';

@Component({
  selector: 'create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  public messageForm: FormGroup;
  private subscription: Subscription;
  private messageModel: CreateMessageInputModel;

  constructor(
    private fb: FormBuilder,
    private verification: UserVerificationService
  ) {}

  ngOnInit(): void {
    this.initializeMessageForm();
  }

  initializeMessageForm(): void {
    this.messageForm = this.fb.group({
      recipient: ['', Validators.required],
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
    console.log(this.messageForm.value);
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
