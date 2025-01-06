import {ENDPOINTS} from "../constants/endpoints";
import {FinancialInfo} from "../interfaces/financials.interface";

export async function getFinancials({
  stockTicker,
  timeframe,
  limit = 20,
}: {
  stockTicker: string;
  timeframe: string;
  limit?: number;
}): Promise<FinancialInfo> {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const financialsEndpoint = ENDPOINTS.getFinancials;
  const params = `?ticker=${stockTicker}&timeframe=${timeframe}&limit=${limit}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;
  const urlWithParams = `${url}${financialsEndpoint}${params}`;
  const getInfo = await fetch(urlWithParams, {
    method: "GET",
  });
  const financials = (await getInfo.json()) as FinancialInfo;
  return financials;
}
