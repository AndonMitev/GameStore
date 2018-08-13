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
  private userModel: RegisterInputModel;
  private subscription: Subscription;
  private registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: UserRegisterService,
    private router: Router,
    private toast: ToastrService
  ) {}

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
    const userData = this.registerForm.value;
    delete userData['confirmPassword'];
    delete userData['confirmEmail'];

    this.userModel = new RegisterInputModel(
      userData['username'],
      userData['password'],
      userData['email'],
      userData['age'],
      userData['countryData'],
      userData['streetAddress']
    );

    this.subscription = this.registerService
      .registerUser(this.userModel)
      .subscribe(data => {
        this.registerService.saveData(data);
        this.router.navigate(['/home']);
        this.toast.success(`Hello for first time, ${userData['username']}!`);
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
