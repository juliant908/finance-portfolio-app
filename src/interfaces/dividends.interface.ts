export interface DividendInfo {
  next_url: string;
  results: Result[];
  status: string;
}

export interface Result {
  cash_amount: number;
  declaration_date: Date;
  dividend_type: string;
  ex_dividend_date: Date;
  frequency: number;
  id: string;
  pay_date: Date;
  record_date: Date;
  ticker: string;
}
