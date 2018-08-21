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
import { UserLoginService } from '../../../core/services/authentication/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public showSpinner: boolean = false;
  private userModel: LoginInputModel;
  private subscription$: Subscription;

  constructor(
    private fb: FormBuilder,
    private loginService: UserLoginService,
    private router: Router,
    private toast: ToastrService
  ) {}

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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public submitLoginForm(): void {
    this.showSpinner = false;
    const USER_DATA = this.loginForm.value;

    this.userModel = new LoginInputModel(
      USER_DATA['username'],
      USER_DATA['password']
    );

    this.showSpinner = true;

    this.subscription$ = this.loginService
      .loginUser(this.userModel)
      .subscribe(res => {
        this.loginService.saveData(res);
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
