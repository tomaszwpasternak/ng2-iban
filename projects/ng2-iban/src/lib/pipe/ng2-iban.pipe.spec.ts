import {Ng2IbanPipe} from './ng2-iban.pipe';
import {Ng2IbanOptionInterface} from './ng2-iban-option.interface';


describe('Angular2IbanPrividerPipe', () => {
  const VALID_IBAN = 'SE3550000000054910000003';
  const VALID_IBAN_ELECTRONIC = 'SE35 5000 0000 0549 1000 0003';

  it('should create an instance', () => {
    const pipe = new Ng2IbanPipe();
    expect(pipe).toBeTruthy();
  });

  it('should not transform for null value', () => {
    const pipe = new Ng2IbanPipe();
    expect(pipe.transform(null)).toBe(null);
    expect(pipe.transform('')).toBe('');
  });

  it('should set default options', () => {
    const pipe = new Ng2IbanPipe();
    expect(pipe.transform(VALID_IBAN, null)).toBe(VALID_IBAN_ELECTRONIC);
  });

  it('should format with atypical separator', () => {
    const pipe = new Ng2IbanPipe();
    const options: Partial<Ng2IbanOptionInterface> = {
      separator: '-'
    };
    expect(pipe.transform(VALID_IBAN, options)).toBe(VALID_IBAN_ELECTRONIC.replace(/ /g, '-'));
  });

  it('should append locale and format with locale', () => {
    const pipe = new Ng2IbanPipe();
    const options: Partial<Ng2IbanOptionInterface> = {
      locale: 'SE'
    };
    expect(pipe.transform(VALID_IBAN.substring(2), options)).toBe(VALID_IBAN_ELECTRONIC);
  });

  it('should append locale and format without locale', () => {
    const pipe = new Ng2IbanPipe();
    const options: Partial<Ng2IbanOptionInterface> = {
      locale: 'SE',
      formatWithLocale: false
    };
    expect(pipe.transform(VALID_IBAN.substring(2), options)).toBe(VALID_IBAN_ELECTRONIC.substring(2));
  });

  it('should not format invalid iban', () => {
    const pipe = new Ng2IbanPipe();
    expect(pipe.transform('invalid iban')).toBe('invalid iban');
  });
});
