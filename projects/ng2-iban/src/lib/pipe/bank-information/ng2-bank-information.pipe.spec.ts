import {Ng2BankInformationPipe} from './ng2-bank-information.pipe';
import {inject, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {Ng2BankInformationService} from '../../service/bank-information/ng2-bank-information.service';
import {Ng2IbanModule} from '../../ng2-iban.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('Ng2BankInformation', () => {
  let pipe: Ng2BankInformationPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        Ng2IbanModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        Ng2BankInformationService,
        Ng2BankInformationPipe
      ]
    });
    pipe = TestBed.get(Ng2BankInformationPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return iban when bank information are empty or null', inject([HttpTestingController],
    (backend: HttpTestingController) => {
      backend.match({
        url: 'assets/ng2-iban/bank-information.json',
        method: 'GET'
      })[0].flush([]);

      expect(pipe.transform('iban')).toEqual('iban');
    }));

  it('should return correct bank title', inject([HttpTestingController],
    (backend: HttpTestingController) => {
      backend.match({
        url: 'assets/ng2-iban/bank-information.json',
        method: 'GET'
      })[0].flush([{locale: 'SE', codes: [{code: '5000', information: {title: 'test'}}]}]);

      expect(pipe.transform('SE3550000000054910000003')).toEqual('test');
    }));

  it('should return first correct bank title', inject([HttpTestingController],
    (backend: HttpTestingController) => {
      backend.match({
        url: 'assets/ng2-iban/bank-information.json',
        method: 'GET'
      })[0].flush([{locale: 'SE', codes: [{code: '5000', information: {title: 'test1'}}, {code: '5000', information: {title: 'test2'}}]}]);

      expect(pipe.transform('SE3550000000054910000003')).toEqual('test1');
    }));

  it('should return first correct bank title when iban is splited', inject([HttpTestingController],
    (backend: HttpTestingController) => {
      backend.match({
        url: 'assets/ng2-iban/bank-information.json',
        method: 'GET'
      })[0].flush([{locale: 'SE', codes: [{code: '5000', information: {title: 'test1'}}, {code: '5000', information: {title: 'test2'}}]}]);

      expect(pipe.transform('3550000000054910000003', {locale: 'SE'})).toEqual('test1');
    }));

  it('should return first correct bank title when iban is splited', inject([HttpTestingController],
    (backend: HttpTestingController) => {
      backend.match({
        url: 'assets/ng2-iban/bank-information.json',
        method: 'GET'
      })[0].flush([{locale: 'SE', codes: [{code: '5000', information: {testData: 'tes1'}},
          {code: '5000', information: {title: 'test2'}}]}]);

      expect(pipe.transform('SE3550000000054910000003', {property: 'testData'})).toEqual('tes1');
    }));
});

