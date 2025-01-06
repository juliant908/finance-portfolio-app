import {
  FinancialInfo,
  FinancialInfoKeys,
} from "../interfaces/financials.interface";

export function generateChartData(
  data: FinancialInfo["results"],
  dataToShow: FinancialInfoKeys
) {
  if (!data) return [];
  const chartData = data
    ?.map(({fiscal_period, financials, fiscal_year}) => {
      const financialData = {
        income: financials.income_statement?.net_income_loss?.value,
        debt: financials.balance_sheet?.long_term_debt?.value,
        cashFlow: financials.cash_flow_statement?.net_cash_flow?.value,
        eps: financials.income_statement?.diluted_earnings_per_share?.value,
      };
      return {
        quarter: fiscal_period + "/" + fiscal_year.slice(-2),
        financialInfo: financialData[dataToShow as keyof typeof financialData],
      };
    })
    .reverse();
  return chartData;
}
