import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//Directives
import { compareValidator } from '../../shared/directives/compare-validator.directive';
import { uniqueUsernameValidator } from '../../shared/directives/username.directive';
//Model
import { RegisterInputModel } from '../../../core/models/input-models/register.model';
//Service
import { UserRegisterService } from '../../../core/services/authentication/register.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public showSpinner: boolean;
  private userModel: RegisterInputModel;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private registerService: UserRegisterService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initializeRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: [
        'asd',
        [Validators.required, Validators.minLength(3)],
        uniqueUsernameValidator(this.registerService)
      ],
      email: ['asd', [Validators.required, Validators.minLength(3)]],
      confirmEmail: ['asd', [Validators.required, compareValidator('email')]],
      password: ['asd', [Validators.required, Validators.minLength(3)]],
      confirmPassword: [
        'asd',
        [Validators.required, compareValidator('password')]
      ],
      age: [13, [Validators.required, Validators.min(12)]],
      countryData: this.initializeCountryData(),
      streetAddress: this.fb.array([this.initializeStreetAddress()])
    });
  }

  initializeCountryData(): FormGroup {
    return this.fb.group({
      country: ['asd', Validators.required],
      city: ['asd', Validators.required],
      state: ['asd', Validators.required],
      zipcode: ['asd', Validators.required]
    });
  }

  initializeStreetAddress(): FormGroup {
    return this.fb.group({
      street: ['asd', Validators.required],
      apartament: ['asd', Validators.required],
      phoneNumber: ['asd', Validators.required]
    });
  }

  submitRegisterForm(): void {
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

    this.subscription = this.registerService
      .registerUser(this.userModel)
      .subscribe(data => {
        this.registerService.saveData(data);
        this.router.navigate(['/game/all']);
        this.showSpinner = false;
        this.toast.success(`Hello for first time, ${USER_DATA['username']}!`);
      });
  }

  addStreetAddress(): void {
    const streetAddress = this.initializeStreetAddress();
    this.streetAddress.push(streetAddress);
  }

  deleteStreetAddress(i: number): void {
    this.streetAddress.removeAt(i);
  }

  get streetAddress(): FormArray {
    return this.registerForm.get('streetAddress') as FormArray;
  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get confirmEmail(): AbstractControl {
    return this.registerForm.get('confirmEmail');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  get age(): AbstractControl {
    return this.registerForm.get('age');
  }

  get country(): AbstractControl {
    return this.registerForm.get('countryData').get('country');
  }

  get city(): AbstractControl {
    return this.registerForm.get('countryData').get('city');
  }

  get state(): AbstractControl {
    return this.registerForm.get('countryData').get('state');
  }

  get zipcode(): AbstractControl {
    return this.registerForm.get('countryData').get('zipcode');
  }

  get street(): AbstractControl {
    return this.registerForm.get('streetAddress');
  }

  get apartament(): AbstractControl {
    return this.registerForm.get('streetAddress');
  }

  get phoneNumber(): AbstractControl {
    return this.registerForm.get('streetAddress');
  }
}
