import {ENDPOINTS} from "../constants/endpoints";
import {fetchWithAuth} from "../utils/fetchWithAuth";

type StockTickerDate = `${number}-${number}-${number}`;
export async function getDailyOpenClose(
  stockTicker: string,
  date: StockTickerDate,
  adjusted: boolean = true
) {
  const url = process.env.BASE_URL ?? "";
  const openCloseEndpoint = ENDPOINTS.openClose;
  const params = `/${stockTicker}/${date}`;
  const qParams = new URLSearchParams({
    adjusted: adjusted.toString(),
  });
  const urlWithParams = `${url}${openCloseEndpoint}${params}?${qParams}`;
  const getInfo = await fetchWithAuth(urlWithParams, {method: "GET"});
  const data = await getInfo.json();
  return data;
}
