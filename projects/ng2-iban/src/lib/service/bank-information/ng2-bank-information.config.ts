export class Ng2BankInformationConfig {
  bankInformationPath: string;
  bankInformationNotFound: any;
}

export const NG2_BANK_INFORMATION_CONFIG_DEFAULT = {
  bankInformationPath: 'assets/ng2-iban/bank-information.json',
  bankInformationNotFound: 'Your bank account is correct, but we can\'t match bank'
};
