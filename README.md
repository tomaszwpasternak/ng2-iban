![Travis (.org)](https://img.shields.io/travis/tomaszwpasternak/ng2-iban)
[![Coverage Status](https://coveralls.io/repos/github/tomaszwpasternak/ng2-iban/badge.svg?branch=master)](https://coveralls.io/github/tomaszwpasternak/ng2-iban?branch=master)
# ng2-iban

Angular 2+ module for IBAN (International bank account number) operations

- [Navigation](#navigation)
    - [Installation](#installation)
    - [Usage](#usage)
       - [Pipe](#pipe)
       - [Service](#service)
       - [Validator](#validator)
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
{{ 'SE3550000000054910000003' | convertIban }} // SE35 5000 0000 0549 1000 0003
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
{{ 'SE3550000000054910000003' | convertIban:options }} // 35-5000-0000-0549-1000-0003
```

#### Pipe in components/services

You can inject pipe to angular 2+ component:
``` typescript

@Component({
  selector:    'app-your-component',
  templateUrl: './your-component.component.html'
})
export class YourComponent {
  private options = { 
    separator: '-'
  };
  
  constructor(private ng2IbanPipe: Ng2IbanPipe) {
    ng2IbanPipe.transform('SE3550000000054910000003', options);  // You can pass options as second parameter
  }
}

```

### Service

Angular 2+ service provide methods that you can do with iban. 

| Method | Response | Description |
| --- | --- | --- |
| `onCheckIban(iban: string, locale?: string)`  | boolean | Validate iban |
| `onConvertToBban(iban: string, separator: string)` | string | Convert iban to bban or throw when iban is incorrect |
| `onConvertFromBban(locale: string, bban: string)` | string | Convert bban to iban |
| `onFormatIban(iban: string, separator: string)` | string | Format iban |

You can inject service to component:
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

### Validator

Angular 2+ form validators for IBAN.

``` typescript
const formGroup = formBuilder.group({
    ibanWithLocale: new FormControl('SE3550000000054910000003', {
    validators: [
       Ng2IbanValidator.ValidatorIBAN
     ]
  },
  ibanWithoutLocale: new FormControl('3550000000054910000003', {
    validators: [
       Ng2IbanValidator.ValidatorIBANWithLocale('SE')
     ]
  })
});
```

## License

MIT
