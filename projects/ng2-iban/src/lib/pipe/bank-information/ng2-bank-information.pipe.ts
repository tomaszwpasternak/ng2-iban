import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Ng2BankInformationService} from '../../service/bank-information/ng2-bank-information.service';
import {Ng2BankInformationOptionInterface} from './ng2-bank-information-option.interface';
import {Subscription} from 'rxjs';

@Pipe({
  name: 'bankInformation',
  pure: false
})
export class Ng2BankInformationPipe implements PipeTransform, OnDestroy {
  private isLoadedData = false;
  private onGetLoadedBankInformationSubscription: Subscription;
  readonly DEFAULT_OPTIONS: Partial<Ng2BankInformationOptionInterface> = {
    locale: null,
    property: 'title'
  };

  constructor(private ng2BankInformationService: Ng2BankInformationService) {
    this.isLoadedData = this.ng2BankInformationService.isLoadedData;

    this.onGetLoadedBankInformationSubscription = this.ng2BankInformationService.onGetLoadedBankInformationSubject
      .subscribe(el => {
        this.isLoadedData = true;
      });
  }

  transform(iban: any, options?: Partial<Ng2BankInformationOptionInterface>): any {
    if (this.isLoadedData === false) {
      setTimeout(() => this.transform(iban, options), 1000);
      return iban;
    }

    const pipeOptions = {
      ...this.DEFAULT_OPTIONS,
      ...options
    };

    if (pipeOptions.locale) {
      iban = pipeOptions.locale + iban;
    }

    if (!this.ng2BankInformationService.bankInformation || this.ng2BankInformationService.bankInformation.length === 0) {
      return iban;
    }

    const matching = this.ng2BankInformationService.onGetBankInformation(iban);
    if (!matching) {
      return iban;
    }

    if (!Array.isArray(matching)) {
      return matching[pipeOptions.property];
    }
    return matching[0][pipeOptions.property];
  }

  ngOnDestroy() {
    this.onGetLoadedBankInformationSubscription.unsubscribe();
  }
}
