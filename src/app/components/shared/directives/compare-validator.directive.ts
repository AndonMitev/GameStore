import { Directive, Input } from '@angular/core';
import {
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  ValidatorFn
} from '@angular/forms';
import { Subscription } from 'rxjs';

export const compareValidator = (controlNameToCompare: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value.length === 0) {
      return null;
    }
    const controlToCompare = control.root.get(controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(
        () => {
          control.updateValueAndValidity();
          subscription.unsubscribe();
        }
      );
    }
    return controlToCompare && controlToCompare.value !== control.value
      ? { compare: true }
      : null;
  };
};

@Directive({
  selector: '[compare]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CompareValidatorDirective,
      multi: true
    }
  ]
})
export class CompareValidatorDirective implements Validator {
  @Input('compare') controlNameToCompare: string;

  validate(c: AbstractControl): ValidationErrors | null {
    return compareValidator(this.controlNameToCompare);
  }
}
