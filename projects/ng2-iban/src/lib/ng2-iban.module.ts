import {ModuleWithProviders, NgModule} from '@angular/core';
import {Ng2IbanPipe} from './pipe/iban/ng2-iban.pipe';
import {Ng2IbanDirective} from './directive/iban/ng2-iban.directive';
import {Ng2BankInformationConfig} from './service/bank-information/ng2-bank-information.config';
import {Ng2IbanProviderConfigInterface} from './ng2-iban-provider-config.interface';
import {Ng2BankInformationPipe} from './pipe/bank-information/ng2-bank-information.pipe';

@NgModule({
  declarations: [
    Ng2IbanPipe,
    Ng2BankInformationPipe,
    Ng2IbanDirective
  ],
  imports: [],
  exports: [
    Ng2IbanPipe,
    Ng2BankInformationPipe,
    Ng2IbanDirective
  ]
})

export class Ng2IbanModule {
  static forRoot(ng2IbanProviderConfig?: Partial<Ng2IbanProviderConfigInterface>): ModuleWithProviders {
    return {
      ngModule: Ng2IbanModule,
      providers: [
        {
          provide: Ng2BankInformationConfig, useValue: ng2IbanProviderConfig.bankInformationConfig
        }
      ]
    };
  }
}
