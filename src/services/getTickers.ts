// example https://api.polygon.io/v3/reference/tickers?market=stocks&search=A&active=true&limit=5&apiKey=L9HDup0NnpNa_yfp0c_qN7IdHmfDBe1W

import {Tickers} from "../interfaces/tickers.interface";
import {ENDPOINTS} from "../constants/endpoints";

export async function getTickers({
  market,
  searchTerm,
  active = true,
  limit = 30,
}: {
  market: string;
  searchTerm: string;
  active?: boolean;
  limit?: number;
}): Promise<Tickers> {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const tickersEndpoint = ENDPOINTS.getTickers;
  const params = `?market=${market}&search=${searchTerm}&active=${active}&limit=${limit}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;
  const urlWithParams = `${url}${tickersEndpoint}${params}`;
  const getInfo = await fetch(urlWithParams, {
    method: "GET",
  });
  const tickers = (await getInfo.json()) as Tickers;
  return tickers;
}
