import { NgModule } from '@angular/core';
import {Ng2IbanPipe} from './pipe/iban/ng2-iban.pipe';
import {Ng2IbanDirective} from './directive/iban/ng2-iban.directive';

@NgModule({
  declarations: [
    Ng2IbanPipe,
    Ng2IbanDirective
  ],
  imports: [
  ],
  exports: [
    Ng2IbanPipe,
    Ng2IbanDirective
  ]
})
export class Ng2IbanModule { }
