export class CryptoPortfolio {
  cryptoID: number;
  code: string;
  client: number;
  accName: string;
  accNo: number;
  Type: string;
  qnty: number;
  datePurchased: Date
  price: number;
  latestdate: Date
  latestvalue: number;
  holdingid: number;

  purchaseValue: number;
  currentValue: number;

  profitValue: number;
  profitPerc: number;
}

export class CryptoTotals {
  code: string;
  totalpurchasevalue: number;
  totalcurrentvalue: number;
  totalprofit: number;
  totprofitperc: number;
}

export class CryptoStats {
  totalValue: number;
  coinStats: Array<StatsByCoin>;
  coinHistory: Array<StatsByDate>;
  cstats: CoinStats;
}

export class StatsByCoin {
  code: string;
  qnty: number;
  purchaseValue: number;
  currentValue: number;
  profit: number;
}

export class StatsByDate {
  valueDate: string;
  currentValue: number;
  profit: number;
}

export class CoinPurchase {
  tokenstring: string;
  portfolio: string;
  coin: string;
  pdate: string;
  qnt: string;
  price: string;
}

export class CoinSale {
  tokenstring: string;
  portfolio: string;
  holdingId: string;
  sdate: string;
  qnt: string;
  price: string;
}

export class CoinList {
  coinno: number;
  coincode: string;
  coinimage: string;
}

export class CoinStats {
  valueDate: string;
  hold_qnt: number;
  hold_val: number;
  hold_profit: number;
  hold_profitperc: number;

  sold_qnt: number;
  sold_val: number;
  sold_Purchased: number;
  sold_profit: number;
  sold_profitperc: number;

  tot_invested: number;
  tot_profit: number;
  tot_profitperc: number;

}

export interface CoinViewData{
  id: string;
  name: string
  rank: string
  price_usd: string
  price_btc: string
  h_volume_usd: string
  market_cap_usd: string
  available_supply: string
  total_supply: string
  max_supply: string
  percent_change_1h: string
  percent_change_24h: string
  percent_change_7d: string
  last_updated: string
  price_aud: string
  volume_aud: string
  market_cap_aud: string
  valueDate: string
}

export class PublicScreen {
  mcap: CoinViewData;
  coinHistory:  Array<StatsByDate>;

}

export class CoinView {
  mcap: CoinViewData;
  coinHistory: Array<StatsByDate>;
  coinPortFolioHistory: Array<StatsByDate>;
  transactions: Array<cointransactions>;
}

export class cointransactions {
  id: number;
  buysell: number;
  transdate: string;
  qnty: number;
  price: number;
  profit: number;
  profitperc: number;
}

export class coinparam {
  holdingid: number;
  tokenstring: string;
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

