import {Ng2IbanService} from './ng2-iban.service';

describe('Angular2IbanPrividerService', () => {
  const VALID_IBAN = 'SE3550000000054910000003';
  const VALID_BBAN = '500 0000005491000000 3';
  const VALID_IBAN_ELECTRONIC = 'SE35 5000 0000 0549 1000 0003';

  it('should create an instance', () => {
    const service = new Ng2IbanService();
    expect(service).toBeTruthy();
  });

  describe('valid iban', () => {
    it('should valid iban without locale', () => {
      const service = new Ng2IbanService();
      expect(service.onCheckIban(VALID_IBAN)).toBe(true);
    });

    it('should valid iban with locale', () => {
      const service = new Ng2IbanService();
      expect(service.onCheckIban(VALID_IBAN.substring(2), 'SE')).toBe(true);
    });

    it('should not valid iban without locale', () => {
      const service = new Ng2IbanService();
      expect(service.onCheckIban('invalid iban', 'invalid locale')).toBe(false);
    });
  });

  describe('convert to bban', () => {
    it('should convert to bban', () => {
      const service = new Ng2IbanService();
      expect(service.onConvertToBban(VALID_IBAN, ' ')).toBe(VALID_BBAN);
    });

    it('should not convert to bban', () => {
      const service = new Ng2IbanService();
      expect(() => service.onConvertToBban('INVALID', ' ')).toThrowError('Invalid iban');
    });
  });

  describe('convert to iban', () => {
    it('should convert to iban', () => {
      const service = new Ng2IbanService();
      expect(service.onConvertFromBban('SE', VALID_BBAN)).toBe(VALID_IBAN);
    });

    it('should not convert to iban', () => {
      const service = new Ng2IbanService();
      expect(() => service.onConvertFromBban('SE', VALID_BBAN.substring(7))).toThrowError('Invalid BBAN');
    });
  });

  describe('format iban', () => {
    it('should format iban', () => {
      const service = new Ng2IbanService();
      expect(service.onFormatIban(VALID_IBAN, ' ')).toBe(VALID_IBAN_ELECTRONIC);
    });
  });
});
