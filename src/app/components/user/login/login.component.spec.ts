import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { UserLoginService } from '../../../core/services/authentication/login.service';
import { SharedModule } from '../../shared/shared.module';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [LoginComponent],
      providers: [
        ToastrService,
        {
          provide: UserLoginService,
          useValue: 'aaa'
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async(() => {
    const FORM = component.loginForm;
    expect(FORM.controls['username'].value).toBe('');
    expect(FORM.controls['password'].value).toBe('');
    expect(FORM.invalid).toBeTruthy();
  }));

  it('form should be valid', async(() => {
    const FORM = component.loginForm;
    FORM.controls['username'].setValue('test');
    FORM.controls['password'].setValue('test');
    expect(FORM.valid).toBeTruthy();
  }));

  it('should throw username invalid error', async(() => {
    const FORM = component.loginForm;
    FORM.controls['username'].setValue('aa');
    FORM.controls['password'].setValue('test');
    expect(FORM.valid).toBeTruthy();
  }));

  it('should throw password invalid error', async(() => {
    const FORM = component.loginForm;
    FORM.controls['username'].setValue('test');
    FORM.controls['password'].setValue('aa');
    expect(FORM.invalid).toBeFalsy();
  }));
});
