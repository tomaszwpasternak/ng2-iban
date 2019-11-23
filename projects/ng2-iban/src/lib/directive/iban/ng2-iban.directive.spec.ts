import {Ng2IbanDirective} from './ng2-iban.directive';
import {FormControl} from '@angular/forms';

describe('Ng2IbanDirective', () => {
  it('should validate empty', () => {
    const ng2IbanDirective = new Ng2IbanDirective();
    expect(ng2IbanDirective.validate(new FormControl(null))).toBe(null);
  });

  it('should not validate not string value', () => {
    const ng2IbanDirective = new Ng2IbanDirective();
    expect(ng2IbanDirective.validate(new FormControl(5))).toEqual({incorrectIban: 'wrong type'});
  });

  it('should validate with locale', () => {
    const ng2IbanDirective = new Ng2IbanDirective();
    ng2IbanDirective.ng2IbanLocale = 'SE';
    expect(ng2IbanDirective.validate(new FormControl('3550000000054910000003'))).toBe(null);
  });

  it('should validate without locale', () => {
    const ng2IbanDirective = new Ng2IbanDirective();
    expect(ng2IbanDirective.validate(new FormControl('SE3550000000054910000003'))).toBe(null);
  });

  it('should not validate without locale', () => {
    const ng2IbanDirective = new Ng2IbanDirective();
    expect(ng2IbanDirective.validate(new FormControl('incorect iban'))).toEqual({incorrectIban: 'incorrect iban'});
  });

  it('should not validate with locale', () => {
    const ng2IbanDirective = new Ng2IbanDirective();
    ng2IbanDirective.ng2IbanLocale = 'SE';
    expect(ng2IbanDirective.validate(new FormControl('incorect iban'))).toEqual({incorrectIban: 'incorrect iban'});
  });
});
