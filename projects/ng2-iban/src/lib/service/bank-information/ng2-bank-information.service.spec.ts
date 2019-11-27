import {Ng2BankInformationService} from './ng2-bank-information.service';
import {inject, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Ng2IbanModule} from '../../ng2-iban.module';


describe('Ng2IbanModule', () => {
  let bankInformationService: Ng2BankInformationService;

  describe('should create module with path null', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          HttpClientTestingModule,
          Ng2IbanModule.forRoot({
            bankInformationConfig: {
              bankInformationPath: null
            }
          })
        ]
      });
    });

    it('should throw an constructor instance', () => {
      expect(() => TestBed.get(Ng2BankInformationService)).toThrowError('Bank information path is incorrect');
    });
  });

  describe('should create module with path without file', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          HttpClientTestingModule,
          Ng2IbanModule
        ]
      });
    });

    it('should throw an constructor instance', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);
        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush('test', {status: 404, statusText: 'Not Found'});

        expect(() => bankInformationService.onGetBankInformation(null)).toThrowError('Bank information are not loaded yet');
      }));
  });

  describe('should create module with path with file', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          HttpClientTestingModule,
          Ng2IbanModule
        ]
      });
    });

    it('should throw an empty bank information', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);

        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush([]);

        expect(() => bankInformationService.onGetBankInformation(null)).toThrowError('Bank information are empty');
      }));

    it('should return null with concat locale', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);

        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush([{}]);

        expect(bankInformationService.onGetBankInformation(null, 'se')).toBe(null);
      }));

    it('should return null without locale', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);

        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush([{}]);

        expect(bankInformationService.onGetBankInformation(null)).toBe(null);
      }));

    it('should throw not found bank information cause no locale', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);

        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush([{}]);

        expect(() => bankInformationService.onGetBankInformation('SE3550000000054910000003'))
          .toThrowError('No matching bank information for locale: SE');
      }));

    it('should return not found bank information', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);

        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush([{locale: 'SE', codes: [{code: '3333', information: {test: 'test'}}]}]);

        expect(bankInformationService.onGetBankInformation('SE3550000000054910000003'))
          .toEqual('Your bank account is correct, but we can\'t match bank');
      }));

    it('should return correct bank information', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);

        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush([{locale: 'SE', codes: [{code: '5000', information: {title: 'test'}}]}]);

        expect(bankInformationService.onGetBankInformation('SE3550000000054910000003'))
          .toEqual({title: 'test'});
      }));

    it('should return correct bank information for 2 matches', inject([HttpTestingController],
      (backend: HttpTestingController) => {
        bankInformationService = TestBed.get(Ng2BankInformationService);

        backend.match({
          url: 'assets/ng2-iban/bank-information.json',
          method: 'GET'
        })[0].flush([{
          locale: 'SE', codes: [{code: '5000', information: {title: 'test'}}, {code: '5000', information: {title: 'tes2t'}}]
        }]);

        expect(bankInformationService.onGetBankInformation('SE3550000000054910000003'))
          .toEqual([{title: 'test'}, {title: 'tes2t'}]);
      }));
  });
});
