import {ENDPOINTS} from "../constants/endpoints";
import {TickerDetails} from "../interfaces/tickerDetails.interface";
import {fetchWithAuth} from "../utils/fetchWithAuth";

export async function getTickerDetails(
  ticker: string
): Promise<TickerDetails | undefined> {
  const url = process.env.BASE_URL ?? "";
  const tickerDetailsUrl = `${url}${ENDPOINTS.tickerDetails}/${ticker}`;

  try {
    const response = await fetchWithAuth(tickerDetailsUrl, {method: "GET"});

    if (!response.ok) {
      throw new Error(`Failed to fetch ticker details for ${ticker}`);
    }

    return (await response.json()) as TickerDetails;
  } catch (error) {
    console.error(`Error fetching ticker details for ${ticker}:`, error);
    return undefined;
  }
}
