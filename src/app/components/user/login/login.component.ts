import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

//Model
import { LoginInputModel } from '../../../core/models/input-models/login.model';
//Service
import { UserLoginService } from '../../../core/services/authentication-services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public showSpinner: boolean;
  public requestSuccess: boolean;
  public buttonText: string;
  public isClicked: boolean;
  private userModel: LoginInputModel;
  private subscription$: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserLoginService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showSpinner = false;
    this.requestSuccess = false;
    this.isClicked = false;
    this.buttonText = 'Sign In';
  }

  public ngOnInit(): void {
    this.initializeLoginForm();
  }

  public ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  public initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      username: 
        [ 
          '',
          Validators.required
        ],
      password: 
        [
          '', 
          Validators.required
        ]
    });
  }

  public submitLoginForm(): void {
    this.isClicked = true;
    this.buttonText = 'Processing...'
    const USER_DATA = this.loginForm.value;

    this.userModel = new LoginInputModel(
      USER_DATA['username'],
      USER_DATA['password']
    );

  

    this.subscription$ = this.userService
      .loginUser(this.userModel)
      .subscribe((res: object) => {
        this.requestSuccess = true;
        this.userService.saveData(res);
        this.router.navigate(['/game/all']);
        this.toast.success(`Welcome again, ${USER_DATA['username']}!`);
      });
  }

  public get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  public get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
