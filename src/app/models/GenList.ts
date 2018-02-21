export interface GenList {
  listNo: number;
  name: string;
}

export class GenAccType {
  client: number;
  accNo: number;
  accName: string;
  accType: number;
  typeName: string;
  entityNo: number;
  entName: string;
  endgoal: number;
  endgoaldate: number;
  info: string;
  sold: number;
  investment: number
}

export class AccountValue  extends  GenAccType  {
  lastvalue: number;
  lastdate: string;
}

export class AccountType {
  id: number;
  typeNo: number;
  typeName: string;
}

export class Entity {
  id: number;
  client: number;
  entNo: number;
  entName: string;
}

/// <reference types="jquery" />
/// <reference types="select2" />
export interface Select2OptionData {
  id: string;
  text: string;
  disabled?: boolean;
  children?: Array<Select2OptionData>;
  additional?: any;
}
export interface Select2TemplateFunction {
  (state: Select2OptionData): JQuery | string;
}
