export interface TickerDetails {
  request_id: string;
  results: Results;
  status: string;
}

export interface Results {
  active: boolean;
  address: Address;
  branding: Branding;
  cik: string;
  composite_figi: string;
  currency_name: string;
  description: string;
  homepage_url: string;
  list_date: Date;
  locale: string;
  market: string;
  market_cap: number;
  name: string;
  phone_number: string;
  primary_exchange: string;
  round_lot: number;
  share_class_figi: string;
  share_class_shares_outstanding: number;
  sic_code: string;
  sic_description: string;
  ticker: string;
  ticker_root: string;
  total_employees: number;
  type: string;
  weighted_shares_outstanding: number;
}

export interface Address {
  address1: string;
  city: string;
  postal_code: string;
  state: string;
}

export interface Branding {
  icon_url: string;
  logo_url: string;
}
