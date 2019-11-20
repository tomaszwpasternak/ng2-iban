import {Injectable} from '@angular/core';
import * as IBAN from 'iban';

@Injectable({
  providedIn: 'root'
})
export class Ng2IbanService {
  onCheckIban(iban: string, locale?: string) {
    if (locale) {
      iban = locale + iban;
    }
    return IBAN.isValid(iban);
  }

  onConvertToBban(iban: string, separator: string) {
    if (!this.onCheckIban(iban)) {
      throw new Error('Invalid iban');
    }
    return IBAN.toBBAN(iban, separator);
  }

  onConvertFromBban(locale: string, bban: string) {
    return IBAN.fromBBAN(locale, bban);
  }

  onFormatIban(iban: string, separator: string) {
    return IBAN.printFormat(iban, separator);
  }
}
