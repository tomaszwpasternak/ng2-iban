import {Pipe, PipeTransform} from '@angular/core';
import * as IBAN from 'iban';
import {Ng2IbanOptionInterface} from './ng2-iban-option.interface';

@Pipe({
  name: 'ibanConverter'
})
export class Ng2IbanPipe implements PipeTransform {
  readonly DEFAULT_OPTIONS: Partial<Ng2IbanOptionInterface> = {
    locale: null,
    separator: ' ',
    formatWithLocale: true
  };

  transform(iban: any, options?: Partial<Ng2IbanOptionInterface>): any {
    const pipeOptions = {
      ...this.DEFAULT_OPTIONS,
      ...options
    };

    if (!iban || typeof iban !== 'string') {
      return iban;
    }

    if (pipeOptions.locale) {
      iban = pipeOptions.locale + iban;
    }

    const regexp = new RegExp(pipeOptions.separator, 'g');
    if (!IBAN.isValid(iban.replace(regexp, ''))) {
      return iban;
    }

    if (pipeOptions.formatWithLocale === true) {
      return IBAN.printFormat(iban, pipeOptions.separator);
    }
    return IBAN.printFormat(iban, pipeOptions.separator).substring(2);
  }
}
