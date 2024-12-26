import { getTickerDetails } from "../../services/tickerDetails";
import { TickerDetails } from "../../interfaces/tickerDetails.interface";
import StockHeader from "@/components/stockHeader";
import { Suspense } from "react";
import StockHeaderLoading from "@/components/stockHeaderLoading";
import StockChart from "@/components/stockChart";


export default async function StockPage({ params }: Readonly<{
 params: Promise<{ ticker: string }>;
}>) {
 const ticker = (await params).ticker;
 let details: TickerDetails = {} as TickerDetails;
 try {
  details = (await getTickerDetails(ticker)) || ({} as TickerDetails);
 } catch (error) {
  console.error("Error fetching ticker details", error);
 }

 return (
  <div className="container my-6">
   <Suspense fallback={<StockHeaderLoading />}>
    <StockHeader props={details?.results} />
   </Suspense>
   <Suspense fallback={<div>Loading chart...</div>}>
    <StockChart stockTicker={ticker} name={details?.results.name} />
   </Suspense>
  </div>
 );
}