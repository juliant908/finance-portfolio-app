// example https://api.polygon.io/v3/reference/dividends?limit=10&apiKey=L9HDup0NnpNa_yfp0c_qN7IdHmfDBe1W

import {DividendInfo} from "../interfaces/dividends.interface";
import {ENDPOINTS} from "../constants/endpoints";

export async function getDividends({
  stockTicker,
  limit = 20,
}: {
  stockTicker: string;
  limit?: number;
}): Promise<DividendInfo> {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const financialsEndpoint = ENDPOINTS.getDividends;
  const params = `?ticker=${stockTicker}&limit=${limit}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;
  const urlWithParams = `${url}${financialsEndpoint}${params}`;
  const getInfo = await fetch(urlWithParams, {
    method: "GET",
  });
  const dividends = (await getInfo.json()) as DividendInfo;
  return dividends;
}
