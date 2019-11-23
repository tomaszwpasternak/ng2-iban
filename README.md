# ng2-iban

![Travis (.org)](https://img.shields.io/travis/tomaszwpasternak/ng2-iban)
[![Coverage Status](https://coveralls.io/repos/github/tomaszwpasternak/ng2-iban/badge.svg?branch=master)](https://coveralls.io/github/tomaszwpasternak/ng2-iban?branch=master)
![GitHub package.json version](https://img.shields.io/github/package-json/v/tomaszwpasternak/ng2-iban)
![NPM](https://img.shields.io/npm/l/ng2-iban)

Angular 2+ module for IBAN (International bank account number) operations

- [Navigation](#navigation)
    - [Installation](#installation)
    - [Usage](#usage)
       - [Pipe](#pipe)
         - [Pipe default options](#pipe-default-options)
         - [Pipe in components/services](#pipe-in-components/services)
       - [Service](#service)
       - [Validator](#validator)
         - [Template driven](#template-driven)
         - [Reactive forms](#reactive-forms)
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

Module provide:
* pipe, 
* service,
* validator.

### Pipe

You can use pipe to convert `iban` into `electonic` format:
``` html
{{ 'SE3550000000054910000003' | ibanConverter }} // SE35 5000 0000 0549 1000 0003
```

#### Pipe default options
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

#### Pipe in components/services

You can inject pipe to angular 2+ component:
``` typescript

@Component({
  selector:    'app-your-component',
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

### Service

Angular 2+ service provide methods that you can do with iban. 

``` typescript

@Component({
  selector:    'app-your-component',
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


### Validator

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

#### Template driven

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

#### Reactive forms

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

## License

[The MIT License](https://github.com/tomaszwpasternak/ng2-iban/blob/master/LICENSE)
