import {FormBuilder, FormControl} from '@angular/forms';
import {Ng2IbanValidator} from './ng2-iban.validator';

describe('Ng2IbanValidator', () => {
  const VALID_IBAN = 'SE3550000000054910000003';
  const formBuilder = new FormBuilder();

  it('should create an instance', () => {
    const service = new Ng2IbanValidator();
    expect(service).toBeTruthy();
  });

  it('should not validate null', () => {
    const formGroup = formBuilder.group({
      iban: new FormControl(null, {
        validators: [
          Ng2IbanValidator.ValidatorIBAN
        ]
      })
    });

    expect(formGroup.valid).toEqual(false);
  });

  it('should not validate incorrect iban', () => {
    const formGroup = formBuilder.group({
      iban: new FormControl('incorrect iban', {
        validators: [
          Ng2IbanValidator.ValidatorIBAN
        ]
      })
    });

    expect(formGroup.valid).toEqual(false);
  });

  it('should validate iban', () => {
    const formGroup = formBuilder.group({
      iban: new FormControl(VALID_IBAN, {
        validators: [
          Ng2IbanValidator.ValidatorIBAN
        ]
      })
    });

    expect(formGroup.valid).toEqual(true);
  });

  it('should not validate null', () => {
    const formGroup = formBuilder.group({
      iban: new FormControl(null, {
        validators: [
          Ng2IbanValidator.ValidatorIBANWithLocale('SE')
        ]
      })
    });

    expect(formGroup.valid).toEqual(false);
  });

  it('should validate iban with locale', () => {
    const formGroup = formBuilder.group({
      iban: new FormControl(VALID_IBAN.substring(2), {
        validators: [
          Ng2IbanValidator.ValidatorIBANWithLocale('SE')
        ]
      })
    });

    expect(formGroup.valid).toEqual(true);
  });

  it('should not validate iban', () => {
    const formGroup = formBuilder.group({
      iban: new FormControl('incorrect iban', {
        validators: [
          Ng2IbanValidator.ValidatorIBANWithLocale('SE')
        ]
      })
    });

    expect(formGroup.valid).toEqual(false);
  });
});
