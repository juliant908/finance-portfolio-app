// example https://api.polygon.io/v2/aggs/ticker/AAPL/range/5/minute/2023-01-09/2023-01-09?adjusted=true&sort=asc

import {ENDPOINTS} from "../constants/endpoints";
import {AggregateInfo} from "../interfaces/aggregates.interface";

// /v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}
export async function getPrices({
  stockTicker,
  multiplier,
  timespan,
  from,
  to,
}: {
  stockTicker: string;
  multiplier: string;
  timespan: string;
  from: string;
  to: string;
}) {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const pricesEndpoint = ENDPOINTS.getPrices;
  const params = `/${stockTicker}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc`;
  const urlWithParams = `${url}${pricesEndpoint}${params}`;
  const getInfo = await fetch(urlWithParams, {
    method: "GET",
    headers: {Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`},
  });
  const data = (await getInfo.json()) as AggregateInfo;
  return data.results;
}
