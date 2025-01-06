export interface FinancialInfo {
  results: Result[];
  status: string;
  request_id: string;
  next_url: string;
}

export interface Result {
  start_date: Date;
  end_date: Date;
  timeframe: Timeframe;
  fiscal_period: string;
  fiscal_year: string;
  cik: string;
  sic: string;
  tickers: Ticker[];
  company_name: CompanyName;
  financials: Financials;
  filing_date?: Date;
  acceptance_datetime?: Date;
  source_filing_url?: string;
  source_filing_file_url?: string;
}

export enum CompanyName {
  AppleInc = "Apple Inc.",
}

export interface Financials {
  income_statement: IncomeStatement;
  balance_sheet: FinancialGeneralities;
  cash_flow_statement: CashFlowStatement;
  comprehensive_income: ComprehensiveIncome;
}

export interface FinancialGeneralities {
  inventory: BalanceSheet;
  equity_attributable_to_parent: BalanceSheet;
  current_assets: BalanceSheet;
  liabilities_and_equity: BalanceSheet;
  assets: BalanceSheet;
  equity: BalanceSheet;
  other_noncurrent_assets: BalanceSheet;
  noncurrent_assets: BalanceSheet;
  long_term_debt: BalanceSheet;
  liabilities: BalanceSheet;
  accounts_payable: BalanceSheet;
  other_current_liabilities: BalanceSheet;
  noncurrent_liabilities: BalanceSheet;
  other_noncurrent_liabilities: BalanceSheet;
  other_current_assets: BalanceSheet;
  current_liabilities: BalanceSheet;
  fixed_assets: BalanceSheet;
  equity_attributable_to_noncontrolling_interest: BalanceSheet;
}

export interface BalanceSheet {
  value: number;
  unit: Unit;
  label: string;
  order: number;
}

export enum Unit {
  Shares = "shares",
  USDShares = "USD / shares",
  Usd = "USD",
}

export interface IncomeStatement {
  benefit_costs_expenses: BalanceSheet;
  gross_profit: BalanceSheet;
  net_income_loss: BalanceSheet;
  diluted_average_shares: BalanceSheet;
  participating_securities_distributed_and_undistributed_earnings_loss_basic: BalanceSheet;
  income_loss_from_continuing_operations_before_tax: BalanceSheet;
  nonoperating_income_loss: BalanceSheet;
  income_loss_from_continuing_operations_after_tax: BalanceSheet;
  basic_earnings_per_share: BalanceSheet;
  net_income_loss_attributable_to_noncontrolling_interest: BalanceSheet;
  operating_expenses: BalanceSheet;
  income_tax_expense_benefit: BalanceSheet;
  revenues: BalanceSheet;
  selling_general_and_administrative_expenses: BalanceSheet;
  costs_and_expenses: BalanceSheet;
  diluted_earnings_per_share: BalanceSheet;
  cost_of_revenue: BalanceSheet;
  research_and_development: BalanceSheet;
  operating_income_loss: BalanceSheet;
  net_income_loss_available_to_common_stockholders_basic: BalanceSheet;
  basic_average_shares: BalanceSheet;
  net_income_loss_attributable_to_parent: BalanceSheet;
  preferred_stock_dividends_and_other_adjustments: BalanceSheet;
}

export interface CashFlowStatement {
  net_cash_flow: BalanceSheet;
  net_cash_flow_from_operating_activities: BalanceSheet;
  net_cash_flow_from_financing_activities: BalanceSheet;
  net_cash_flow_from_investing_activities: BalanceSheet;
  net_cash_flow_from_investing_activities_continuing: BalanceSheet;
  net_cash_flow_from_operating_activities_continuing: BalanceSheet;
  net_cash_flow_from_financing_activities_continuing: BalanceSheet;
  net_cash_flow_continuing: BalanceSheet;
}

export interface ComprehensiveIncome {
  comprehensive_income_loss_attributable_to_parent: BalanceSheet;
  other_comprehensive_income_loss_attributable_to_parent: BalanceSheet;
  other_comprehensive_income_loss: BalanceSheet;
  comprehensive_income_loss: BalanceSheet;
  comprehensive_income_loss_attributable_to_noncontrolling_interest: BalanceSheet;
}

export enum Ticker {
  Aapl = "AAPL",
}

export enum Timeframe {
  Quarterly = "quarterly",
}

export type FinancialInfoKeys =
  | "income"
  | "debt"
  | "cashFlow"
  | "comprehensiveIncome";
