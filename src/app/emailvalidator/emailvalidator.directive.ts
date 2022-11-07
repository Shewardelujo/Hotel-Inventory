import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Directive({
  selector: '[appEmailvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS, //this is we adding our validators to the existing ng validators
      useExisting: EmailvalidatorDirective,
      multi: true,
      //eventually it is an array of validators, both the ng ones and the ones created, else why multi:true, since it isn't an object but an array
    },
  ],
})
export class EmailvalidatorDirective implements Validators {
  constructor() {}
  validate(control: AbstractControl): ValidationErrors | null {
    //what it returns is a type of ValidationErrors or null... ValidationErrors is a type of key and value
    const value = control.value as string;
    if (value.includes('test')) {
      return {
        //key: value
        invalidEmail: true,
      };
    }
    return null;
  }
}
