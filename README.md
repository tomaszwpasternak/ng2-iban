# ng2-iban

![Travis (.org)](https://img.shields.io/travis/tomaszwpasternak/ng2-iban)
[![Coverage Status](https://coveralls.io/repos/github/tomaszwpasternak/ng2-iban/badge.svg?branch=master)](https://coveralls.io/github/tomaszwpasternak/ng2-iban?branch=master)
![NPM](https://img.shields.io/npm/l/ng2-iban)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/tomaszwpasternak/ng2-iban)

Angular 2+ module for IBAN (International bank account number) operations

- [Navigation](#navigation)
    - [Installation](#installation)
    - [Usage](#usage)
       - [Iban operations](#iban-operations)
         - [Pipe](#pipe)
           - [Pipe default options](#pipe-default-options)
           - [Pipe in components and services](#pipe-in-components-and-services)
         - [Service](#service)
         - [Validator](#validator)
           - [Template driven](#template-driven)
           - [Reactive forms](#reactive-forms)
       - [Bank account operations](#bank-account-operations)
         - [Module options](#module-options)
         - [bank information file](#bank-information-file)
         - [Bank information service](#bank-information-service)
         - [Bank information pipe](#bank-information-pipe)
    - [License](#license)

## Installation

npm:
```
npm install --save ng2-iban iban
```

Now you need to import Ng2IbanModule to your module

``` typescript
import { Ng2IbanModule } from 'ng2-iban';

@NgModule({
  declarations: [],
  imports: [Ng2IbanModule]
})
export class YourModule {
}
```

## Usage

Ng2IbanModule provide two types of functionality. You can management with iban or provide bank information.

### Iban operations

Iban is international bank account number which contains **locale** symbol, **control sum** or **bank code**. 
Locale characters are two first letters from iban. Next two are called as control sum. From 4 character to 8 we named bank code.
For operations on that fields you can use:
* pipe, 
* service,
* validator.

#### Pipe

You can use pipe to convert `iban` into `electronic` format:
``` html
{{ 'SE3550000000054910000003' | ibanConverter }} // SE35 5000 0000 0549 1000 0003
```

##### Pipe default options
``` typescript
{
  locale: null,
  separator: ' ',
  formatWithLocale: true 
}
```
To override options pass it to pipe:
``` html
{{ 'SE3550000000054910000003' | ibanConverter:options }} // 35-5000-0000-0549-1000-0003
```

##### Pipe in components and services

You can inject pipe to angular 2+ component:
``` typescript

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  providers: [
    Ng2IbanPipe
  ]
})
export class YourComponent {
  private options = { 
    separator: '-'
  };
  
  constructor(private ng2IbanPipe: Ng2IbanPipe) {
    ng2IbanPipe.transform('SE3550000000054910000003', this.options);  // You can pass options as second parameter
  }
}

```

#### Service

Angular 2+ service provide methods that you can do with iban. 

``` typescript

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html'
})
export class YourComponent {
  constructor(private ng2IbanService: Ng2IbanService) {
    ng2IbanService.onCheckIban('3550000000054910000003', 'SE');
  }
}
```

Service API

| Method | Response | Description |
| --- | --- | --- |
| `onCheckIban(iban: string, locale?: string)`  | boolean | Validate iban |
| `onConvertToBban(iban: string, separator: string)` | string | Convert iban to bban or throw when iban is incorrect |
| `onConvertFromBban(locale: string, bban: string)` | string | Convert bban to iban |
| `onFormatIban(iban: string, separator: string)` | string | Format iban |


#### Validator

At the first you must inject module `FormsModule`
``` typescript
@NgModule({
  //...
  imports: [
    //...
    FormsModule
  ]
  //...
})
export class YourModule { }

```

##### Template driven

You can use directive for template driven 

``` typescript
@Component({
    template: `<input type="text" ng2IbanValidation [(ngModel)]="iban">`,
    providers: [Ng2IbanDirective]
})
export class Component {
    public iban: string;
}
```

If you want to validate without locale:

``` typescript
@Component({
    template: `<input type="text" ng2IbanValidation ng2IbanLocale="SE" [(ngModel)]="iban">`,
    providers: [Ng2IbanDirective]
})
export class Component {
    public iban: string;
}
```

##### Reactive forms

Reactive forms validation

``` typescript
const formGroup = formBuilder.group({
  ibanWithLocale: new FormControl('SE3550000000054910000003', {
    validators: [
      Ng2IbanValidator.ValidatorIBAN
    ]
  }),
  ibanWithoutLocale: new FormControl('3550000000054910000003', {
    validators: [
      Ng2IbanValidator.ValidatorIBANWithLocale('SE')
    ]
  })
});
```

### Bank account operations

This part of package focus on converting 

#### Module options

``` typescript
import { Ng2IbanModule } from 'ng2-iban';

@NgModule({
  declarations: [],
  imports: [Ng2IbanModule.forRoot({
    bankInformationConfig: {
      bankInformationPath: 'assets/my-bank-json.json',  // Path to bank code list
      bankInformationNotFound: 'Your bank code cannot be found' // Message returned when service cant find bank information
    }
  )
  ]
})
export class YourModule {
}
```

#### Bank information file

You need to create json file *(assets/ng2-bank-information.json)*. Example:

``` json
[
  {
    "locale": "SE",
    "codes": [
      {
        "code": "5000",
        "information": {
          "img": "https://...",
          "title": "Your bank",
          "description": "Any custom informations",
          "customField": "You can add whatever you want"
        }
      }
    ]
  }
]

```

#### Bank information service

Angular 2+ service for getting bank information. 

``` typescript

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html'
})
export class YourComponent {
  onGetLoadedBankInformationSubscription: Subscription;

  constructor(private ng2BankInformationService: Ng2BankInformationService) {
    this.onGetLoadedBankInformationSubscription = this.ng2BankInformationService
      .onGetLoadedBankInformationSubject.subscribe(() => {
          let bankInformation = this.ng2BankInformationService.onGetBankInformation('SE3550000000054910000003');
        }
      );
  }
}
```

#### Bank information pipe

``` html
{{ 'SE3550000000054910000003' | bankInformation }} // return property title from json
```

If you want override options: 

``` html
{{ 'SE3550000000054910000003' | bankInformation:{locale: null, property: 'title'}}
```

## License

[The MIT License](https://github.com/tomaszwpasternak/ng2-iban/blob/master/LICENSE)
