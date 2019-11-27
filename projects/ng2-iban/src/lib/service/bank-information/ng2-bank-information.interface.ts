export interface Ng2BankInformationInterface {
  locale: string;
  codes: Code[];
}

interface Code {
  code: string;
  information: any;
}
