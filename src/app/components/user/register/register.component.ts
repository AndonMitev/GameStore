import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//Directives
import { compareValidator } from '../../shared/directives/compare-validator.directive';
import { uniqueUsernameValidator } from '../../shared/directives/username.directive';
//Model
import { RegisterInputModel } from '../../../core/models/input-models/register.model';
//Service
import { UserRegisterService } from '../../../core/services/authentication-services/register.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public showSpinner: boolean;
  private userModel: RegisterInputModel;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserRegisterService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public initializeRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: 
        [
          '',
          [Validators.required, Validators.minLength(3)],
          uniqueUsernameValidator(this.userService)
        ],
      email: 
        [
          '',
          [
            Validators.required, 
            Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          ]
        ],
      confirmEmail: 
        [
          '',
          [Validators.required, compareValidator('email')]
        ],
      password: 
        [
          '',
          [Validators.required, Validators.minLength(3)]
        ],
      confirmPassword:
        [
          '',
          [Validators.required, compareValidator('password')]
        ],
      age: 
        [
          12,
          [Validators.required, Validators.min(12)]
        ],
      countryData: this.initializeCountryData(),
      streetAddress: this.fb.array([this.initializeStreetAddress()])
    });
  }

  public initializeCountryData(): FormGroup {
    return this.fb.group({
      country: 
        [
          '',
          Validators.required
        ],
      city: 
        [
          '',
          Validators.required
        ],
      state: 
        [
          '',
          Validators.required
        ],
      zipcode: 
        [
          '',
          Validators.required
        ]
    });
  }

  public initializeStreetAddress(): FormGroup {
    return this.fb.group({
      street: 
        [ 
          '',
          Validators.required
        ],
      apartament: 
        [ 
          '',
          Validators.required
        ],
      phoneNumber:
        [
          '',
          Validators.required
        ]
    });
  }

  public submitRegisterForm(): void {
    this.showSpinner = true;
    const USER_DATA = this.registerForm.value;
    delete USER_DATA['confirmPassword'];
    delete USER_DATA['confirmEmail'];

    this.userModel = new RegisterInputModel(
      USER_DATA['username'],
      USER_DATA['password'],
      USER_DATA['email'],
      USER_DATA['age'],
      USER_DATA['countryData'],
      USER_DATA['streetAddress']
    );

    this.userService
      .registerUser(this.userModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: object) => {
        this.userService.saveData(data);
        this.router.navigate(['/game/all']);
        this.showSpinner = false;
        this.toast.success(`Hello for first time, ${USER_DATA['username']}!`);
      });
  }

  public addStreetAddress(): void {
    const streetAddress = this.initializeStreetAddress();
    this.streetAddress.push(streetAddress);
  }

  public deleteStreetAddress(i: number): void {
    this.streetAddress.removeAt(i);
  }

  public get streetAddress(): FormArray {
    return this.registerForm.get('streetAddress') as FormArray;
  }

  public get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  public get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  public get confirmEmail(): AbstractControl {
    return this.registerForm.get('confirmEmail');
  }

  public get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  public get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  public get age(): AbstractControl {
    return this.registerForm.get('age');
  }

  public get country(): AbstractControl {
    return this.registerForm.get('countryData').get('country');
  }

  public get city(): AbstractControl {
    return this.registerForm.get('countryData').get('city');
  }

  public get state(): AbstractControl {
    return this.registerForm.get('countryData').get('state');
  }

  public get zipcode(): AbstractControl {
    return this.registerForm.get('countryData').get('zipcode');
  }

  public get street(): AbstractControl {
    return this.registerForm.get('streetAddress');
  }

  public get apartament(): AbstractControl {
    return this.registerForm.get('streetAddress');
  }

  public get phoneNumber(): AbstractControl {
    return this.registerForm.get('streetAddress');
  }
}
