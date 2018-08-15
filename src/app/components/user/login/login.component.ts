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
  public showSpinner: boolean;
  private userModel: LoginInputModel;
  private subscription$: Subscription;

  constructor(
    private fb: FormBuilder,
    private loginService: UserLoginService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLoginForm(): void {
    const userData = this.loginForm.value;
    this.userModel = new LoginInputModel(
      userData['username'],
      userData['password']
    );
    this.showSpinner = true;
    this.subscription$ = this.loginService
      .loginUser(this.userModel)
      .subscribe(res => {
        this.loginService.saveData(res);
        this.router.navigate(['/home']);
        this.showSpinner = false;
        this.toast.success(`Welcome again, ${userData['username']}!`);
      });
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
