import {inject, TestBed} from '@angular/core/testing';
import {Ng2IbanModule} from './ng2-iban.module';
import {Ng2BankInformationService} from './service/bank-information/ng2-bank-information.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('Ng2IbanModule', () => {
  let module: Ng2IbanModule;
  let bankInformationService: Ng2BankInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        Ng2IbanModule.forRoot(
          {
            bankInformationConfig: {
              bankInformationPath: 'testPath',
              bankInformationNotFound: 'testNotFound'
            }
          }
        )
      ]
    });
    module = TestBed.get(Ng2IbanModule);

    bankInformationService = TestBed.get(Ng2BankInformationService);
  });

  it('should create an instance', inject([HttpTestingController],
    (backend: HttpTestingController) => {
      backend.match({
        url: 'testPath',
        method: 'GET'
      })[0].flush([]);

      expect(bankInformationService).toBeTruthy();
      expect(bankInformationService['config'].bankInformationPath).toEqual('testPath');
      expect(bankInformationService['config'].bankInformationNotFound).toEqual('testNotFound');
    }));
});
