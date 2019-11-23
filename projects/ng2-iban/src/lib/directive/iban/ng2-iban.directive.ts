import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import * as IBAN from 'iban';

@Directive({
  selector: '[ng2IbanValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: Ng2IbanDirective, multi: true}]
})
export class Ng2IbanDirective implements Validator {
  private locale = null;

  @Input() set ng2IbanLocale(locale: any) {
    this.locale = locale;
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    let value = c.value;
    if (!value) {
      return null
    }

    if (typeof value !== 'string') {
      return {incorrectIban: 'wrong type'};
    }

    if (this.locale) {
      value = this.locale + value;
    }

    if (IBAN.isValid(value)) {
      return null;
    }

    return {incorrectIban: 'incorrect iban'};
  }
}
