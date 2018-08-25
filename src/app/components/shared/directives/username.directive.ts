import { Directive } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
  NG_ASYNC_VALIDATORS,
  AsyncValidatorFn
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { UserRegisterService } from '../../../core/services/authentication-services/register.service';
import { EditUserProfileService } from '../../../core/services/profile-services/edit-profile.service';

export function uniqueUsernameValidator(
  userService: UserRegisterService | EditUserProfileService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const username: object = { username: control.value };
    
    return userService
      .checkIfUsernameExists(username)
      .pipe(
        debounceTime(500),
        map(res => {
          return res['usernameExists'] === true ? { uniqueUsername: true } : null;
        })
      );
  };
}

@Directive({
  selector: '[uniqueUsername]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueUsernameValidatorDirective,
      multi: true
    }
  ]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
  constructor(private userService: UserRegisterService) {}

  public validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueUsernameValidator(this.userService)(control);
  }
}
