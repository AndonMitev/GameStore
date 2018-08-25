import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  private userModel: LoginInputModel;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserLoginService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showSpinner = false;
  }

  public ngOnInit(): void {
    this.initializeLoginForm();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public submitLoginForm(): void {
    const USER_DATA = this.loginForm.value;
    this.userModel = new LoginInputModel(
      USER_DATA['username'],
      USER_DATA['password']
    );

    this.showSpinner = true;
    this.userService
      .loginUser(this.userModel)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res: object) => {
          this.userService.saveData(res);
          this.router.navigate(['/game/all']);
          this.toast.success(`Welcome again, ${USER_DATA['username']}!`);
          this.showSpinner = false;
        },
        () => {
          this.showSpinner = false;
          this.initializeLoginForm();
        }
      );
  }

  public get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  public get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
