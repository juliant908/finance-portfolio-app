"use client"

import { FinancialInfo, FinancialInfoKeys } from "../../interfaces/financials.interface"
import FinancialDataChart from "./charts/financialDataChart"
import { getFinancials } from "../../services/getFinancials"
import { useEffect, useState } from "react";
import { DividendInfo } from "../../interfaces/dividends.interface";
import { getDividends } from "../../services/getDividends";
import DividendDataChart from "@/components/charts/dividendDataChart";

const generateFinancialData = (name: string) => [
 {
  id: 1,
  title: `Net Income of ${name}`,
  dataToShow: "income" as FinancialInfoKeys,
  label: "Net Income $: ",
  barColor: "yellow",
 },
 {
  id: 2,
  title: `Long Term Debt of ${name}`,
  dataToShow: "debt" as FinancialInfoKeys,
  label: "Debt $: ",
  barColor: "red",
 },
 {
  id: 3,
  title: `Cash Flow of ${name}`,
  dataToShow: "cashFlow" as FinancialInfoKeys,
  label: "Cash Flow $: ",
  barColor: "blue",
 },
 {
  id: 4,
  title: `Earnings per share of ${name}`,
  dataToShow: "eps" as FinancialInfoKeys,
  label: "EPS $: ",
  barColor: "orange",
 },
]

export default function CompanyFinances({
 stockTicker,
 name,
}: Readonly<{ stockTicker: string, name: string }>) {
 const [results, setResults] = useState([] as FinancialInfo["results"]);
 const [dividend, setDividend] = useState([] as DividendInfo["results"]);

 useEffect(() => {
  getFinancials({ stockTicker, timeframe: "quarterly" }).then((data) => {
   setResults(data.results)
  }).catch((error) => {
   console.error(error)
  })

  getDividends({ stockTicker }).then((data) => {
   setDividend(data.results)
  }).catch((error) => {
   console.error(error)
  })
 }, [stockTicker])

 const financialData = generateFinancialData(name)

 return (
  <div className="grid grid-cols-2 gap-12 mt-12">
   {financialData.map(({ id, title, dataToShow, label, barColor }) => (
    results.length > 0 ? <FinancialDataChart
     key={id}
     title={title}
     data={results}
     label={label}
     stockTicker={stockTicker}
     barColor={barColor}
     dataToShow={dataToShow}
    /> : <p key={id}>No data found for <strong>{title}</strong></p>
   ))}
   <DividendDataChart
    title={`Dividend Data of ${name}`}
    data={dividend}
    label="Dividend $: "
    stockTicker={stockTicker}
    barColor="green"
   />
  </div>
 )
}