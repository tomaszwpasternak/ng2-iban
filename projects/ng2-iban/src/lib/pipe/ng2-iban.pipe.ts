import {Pipe, PipeTransform} from '@angular/core';
import * as IBAN from 'iban';
import {Ng2IbanOptionInterface} from './ng2-iban-option.interface';
@Pipe({
  name: 'ibanConverter'
})
export class Ng2IbanPipe implements PipeTransform {
  readonly DEFAULT_SEPARATOR = ' ';
  readonly DEFAULT_FORMAT_WITH_LOCALE = true;

  transform(iban: any, options?: Partial<Ng2IbanOptionInterface>): any {
    if (!iban) {
      return iban;
    }

    if (!options) {
      options = {};
    }

    if (typeof (options.separator) === 'undefined') {
      options.separator = this.DEFAULT_SEPARATOR;
    }

    if (typeof (options.formatWithLocale) === 'undefined') {
      options.formatWithLocale = this.DEFAULT_FORMAT_WITH_LOCALE;
    }

    if (typeof (options.locale) !== 'undefined') {
      iban = options.locale + iban;
    }

    const regexp = new RegExp(options.separator, 'g');
    if (!IBAN.isValid(iban.replace(regexp, ''))) {
      return iban;
    }

    if (options.formatWithLocale === true) {
      return IBAN.printFormat(iban, options.separator);
    }
    return IBAN.printFormat(iban, options.separator).substring(2);
  }
}
