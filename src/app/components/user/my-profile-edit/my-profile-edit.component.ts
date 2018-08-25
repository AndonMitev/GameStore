import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//Service
import { GetProfileService } from '../../../core/services/profile-services/get-profile.service';
import { EditUserProfileService } from '../../../core/services/profile-services/edit-profile.service';
//State
import { AppState } from '../../../store/app.state';
//Model
import { RegisterInputModel } from '../../../core/models/input-models/register.model';

@Component({
  selector: 'my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css']
})
export class MyProfileEditComponent implements OnInit, OnDestroy {
  public userData: RegisterInputModel;
  public editUserForm: FormGroup;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();
  private userInfo: Object;
  private userId: string;

  constructor(
    private actRoute: ActivatedRoute,
    private profileService: GetProfileService,
    private profileEditService: EditUserProfileService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.actRoute.paramMap
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ParamMap) => {
        this.userId = res['params']['id'];

        this.profileService
          .getProfile(this.userId)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(() => {
            this.store
              .pipe(
                select(state => state.users.user),
                takeUntil(this.ngUnsubscribe$)
              )
              .subscribe((res: RegisterInputModel) => {
                this.userInfo = {
                  username: res.username,
                  email: res.email,
                  age: +res.age
                };
                this.userData = res;
                this.initializeEditUserForm();
                this.setValues();
              });
          });
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public initializeEditUserForm(): void {
    this.editUserForm = this.fb.group({
      countryData: this.initializeCountryData(),
      streetAddress: this.fb.array([this.initializeStreetAddress()])
    });
  }

  public initializeCountryData(): FormGroup {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
    });
  }

  public initializeStreetAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  public setValues(): void {
    this.country.setValue(this.userData.countryData.country);
    this.city.setValue(this.userData.countryData.city);
    this.state.setValue(this.userData.countryData.state);
    this.zipcode.setValue(this.userData.countryData.zipcode);
    this.setExistingAddressData();
  }

  public setExistingAddressData(): void {
    this.deleteStreetAddress(0);

    this.userData['streetAddress'].forEach(x => {
      this.streetAddress.push(
        this.fb.group({
          street: x.street,
          apartment: x.apartment,
          phoneNumber: x.phoneNumber
        })
      );
    });
  }

  public submitEditUserForm(): void {
    this.userInfo['countryData'] = this.editUserForm.value.countryData;
    this.userInfo['streetAddress'] = this.editUserForm.value.streetAddress;

    this.profileEditService
      .editUserProfile(this.userInfo, this.userId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        this.toast.success(
          `${this.userInfo['username']} profile was successfully edited.`
        );
        this.router.navigate([`/user/profile/${this.userId}`]);
      });
  }

  public addStreetAddress(): void {
    const STREET_ADDRESS = this.initializeStreetAddress();
    this.streetAddress.push(STREET_ADDRESS);
  }

  public deleteStreetAddress(i: number): void {
    this.streetAddress.removeAt(i);
  }

  public get streetAddress(): FormArray {
    return this.editUserForm.get('streetAddress') as FormArray;
  }

  public get country(): AbstractControl {
    return this.editUserForm.get('countryData').get('country');
  }

  public get city(): AbstractControl {
    return this.editUserForm.get('countryData').get('city');
  }

  public get state(): AbstractControl {
    return this.editUserForm.get('countryData').get('state');
  }

  public get zipcode(): AbstractControl {
    return this.editUserForm.get('countryData').get('zipcode');
  }

  public get street(): AbstractControl {
    return this.editUserForm.get('streetAddress');
  }

  public get apartment(): AbstractControl {
    return this.editUserForm.get('streetAddress');
  }

  public get phoneNumber(): AbstractControl {
    return this.editUserForm.get('streetAddress');
  }
}
