import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function allowedValuesValidator(allowedValues: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!allowedValues.includes(control.value)) {
      return { allowedValues: { value: control.value } };
    }
    return null;
  };
}
