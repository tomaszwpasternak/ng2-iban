import {Injectable, OnDestroy, Optional} from '@angular/core';
import {NG2_BANK_INFORMATION_CONFIG_DEFAULT, Ng2BankInformationConfig} from './ng2-bank-information.config';
import {HttpClient} from '@angular/common/http';
import {Ng2BankInformationInterface} from './ng2-bank-information.interface';
import {Ng2IbanService} from '../iban/ng2-iban.service';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ng2BankInformationService implements OnDestroy {
  public bankInformation: Array<Ng2BankInformationInterface> = null;
  public isLoadedData = false;
  private config: Ng2BankInformationConfig;
  private onLoadBankInformationSubject: Subject<void> = new Subject();
  private onGetJsonFileSubscription: Subscription;

  get onGetLoadedBankInformationSubject() {
    return this.onLoadBankInformationSubject.asObservable();
  }

  constructor(@Optional() config: Ng2BankInformationConfig,
              private ng2IbanService: Ng2IbanService,
              private httpClient: HttpClient) {
    this.config = {
      ...NG2_BANK_INFORMATION_CONFIG_DEFAULT,
      ...config
    };

    if (!this.config.bankInformationPath) {
      throw new Error('Bank information path is incorrect');
    }

    this.onGetJsonFileSubscription = this.httpClient.get(this.config.bankInformationPath)
      .subscribe((data: Array<Ng2BankInformationInterface>) => {
        this.bankInformation = data;
        this.isLoadedData = true;
        this.onLoadBankInformationSubject.next();
      }, () => {
       console.error('Cannot get bank information file with path: ' + this.config.bankInformationPath);
      });
  }

  onGetBankInformation(iban: string, locale?: string) {
    if (!this.bankInformation) {
      throw new Error('Bank information are not loaded yet');
    }
    if (this.bankInformation.length === 0) {
      throw new Error('Bank information are empty');
    }

    if (locale) {
      iban = locale + iban;
    }

    if (!this.ng2IbanService.onCheckIban(iban)) {
      return null;
    }

    const matchingBankInformations = this.bankInformation.filter(el => el.locale === iban.substring(0, 2));
    if (!matchingBankInformations || matchingBankInformations.length === 0) {
      throw new Error('No matching bank information for locale: ' + iban.substring(0, 2));
    }

    let matchingBankLocales = [];
    matchingBankInformations.forEach(matchingBankInformation => {
      matchingBankLocales = matchingBankInformation.codes.filter(el => {
        if (el.code.length === 0) { return false; }
        return el.code === iban.substring(4, 4 + el.code.length);
      });
    });

    if (matchingBankLocales.length === 0) {
      return this.config.bankInformationNotFound;
    }

    if (matchingBankLocales.length === 1) {
      return matchingBankLocales[0].information;
    }
    return matchingBankLocales.map(value => value.information);
  }

  ngOnDestroy(): void {
    this.onGetJsonFileSubscription.unsubscribe();
  }
}
