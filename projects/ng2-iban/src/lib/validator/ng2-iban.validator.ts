import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as IBAN from 'iban';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Ng2IbanValidator {
  static ValidatorIBAN(ibanControl: AbstractControl): { [key: string]: any } | null {
    if (!ibanControl || !ibanControl.value) {
      return {incorrectIban: true};
    }
    return IBAN.isValid(ibanControl.value) ? null : {incorrectIban: true};
  }

  static ValidatorIBANWithLocale(locale: string): ValidatorFn {
    return (ibanControl: AbstractControl): { [key: string]: any } | null => {
      if (!ibanControl || !ibanControl.value || !locale) {
        return {incorrectIban: true};
      }
      return IBAN.isValid(locale + ibanControl.value) ? null : {incorrectIban: true};
    };
  }
}


