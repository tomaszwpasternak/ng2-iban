import { NgModule } from '@angular/core'
import {Ng2IbanPipe} from './pipe/ng2-iban.pipe';

@NgModule({
  declarations: [
    Ng2IbanPipe
  ],
  imports: [
  ],
  exports: [
    Ng2IbanPipe
  ]
})
export class Ng2IbanModule { }
