"use client"

import { useEffect, useState } from "react";
import { getPrices } from "../services/getPrices";
import { AggregateInfo } from "../interfaces/aggregates.interface";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/components/ui/card"
import {
 ChartConfig,
 ChartContainer,
 ChartTooltip,
 ChartTooltipContent,
} from "@/components/components/ui/chart"

function getHoursMinutes(date: number) {
 const d = new Date(date)
 return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`
}

function processPrices(data: AggregateInfo["results"]) {
 return data.map((price) => ({
  time: (getHoursMinutes(price.t)).toString(),
  stockPrice: price.c.toString(),
 }))
}

function getMinAndMax(data: { stockPrice: string }[]) {
 const prices = data.map((price) => Number(price.stockPrice))
 return [Math.min(...prices), Math.max(...prices)]
}

function getIncreaseDecrease(data: { stockPrice: string }[]): number {
 const firstPrice = Number(data[0]?.stockPrice)
 const lastPrice = Number(data[data.length - 1]?.stockPrice)
 return lastPrice - firstPrice
}

function getPercentageIncreaseDecrease(data: { stockPrice: string }[]): number {
 const firstPrice = Number(data[0]?.stockPrice)
 const lastPrice = Number(data[data.length - 1]?.stockPrice)
 return ((lastPrice - firstPrice) / firstPrice) * 100
}

export default function StockChart({ stockTicker, name }: {
 stockTicker: string,
 name: string
}) {
 const [timespan, setTimespan] = useState("1d");
 const [chartData, setChartData] = useState([] as { time: string; stockPrice: string }[]);
 const [min, setMin] = useState(0);
 const [max, setMax] = useState(0);

 useEffect(() => {
  getPrices({
   stockTicker,
   multiplier: "5",
   timespan: "minute",
   from: "2023-01-09",
   to: "2023-01-09"
  }).then((data) => {
   setChartData(processPrices(data));
   setMin(getMinAndMax(processPrices(data))[0]);
   setMax(getMinAndMax(processPrices(data))[1]);
  });
 }, [stockTicker, timespan]);

 const chartConfig = {
  stockPrice: {
   label: "Stock price:",
   color: "hsl(var(--chart-1))",
  },
 } satisfies ChartConfig

 return (
  <div className="my-5">
   <Card>
    <CardHeader>
     <CardTitle>{name} - {stockTicker}</CardTitle>
     <CardDescription>
      Value of {stockTicker} stock
     </CardDescription>
    </CardHeader>
    <CardContent>
     <ChartContainer config={chartConfig}>
      <LineChart
       accessibilityLayer
       data={chartData}
       margin={{
        left: 12,
        right: 12,
       }}

      >
       <CartesianGrid vertical={false} />
       <XAxis
        dataKey="time"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => value}
       />
       <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
       />
       <YAxis hide domain={[min * 0.999, max * 1.001]} />
       <Line type="monotone" dataKey="stockPrice" stroke={`${getIncreaseDecrease(chartData) > 0 ? 'green' : 'red'}`} strokeWidth={3} dot={false} />
      </LineChart>
     </ChartContainer>
    </CardContent>
    <CardFooter>
     <div className="mb-8 flex gap-12 justify-center">
      <button
       className="bg-white text-black font-bold px-6 py-2 rounded-3xl"
       onClick={() => setTimespan("1d")}
      >
       1D
      </button>
      <button
       className="bg-white text-black font-bold px-6 py-2 rounded-3xl"
       onClick={() => setTimespan("1w")}
      >
       1W
      </button>
      <button
       className="bg-white text-black font-bold px-6 py-2 rounded-3xl"
       onClick={() => setTimespan("1m")}
      >
       1M
      </button>
      <button
       className="bg-white text-black font-bold px-6 py-2 rounded-3xl"
       onClick={() => setTimespan("3m")}
      >
       3M
      </button>
      <button
       className="bg-white text-black font-bold px-6 py-2 rounded-3xl"
       onClick={() => setTimespan("1y")}
      >
       1Y
      </button>
     </div>
     <div className="flex w-full items-start gap-2 text-sm">
      <div className="grid gap-2">
       <div className="flex flex-col gap-2 font-medium text-xl leading-none">
        <p>Closing price of {stockTicker}: <strong>${chartData[chartData.length - 1]?.stockPrice}</strong></p>
        <p className={`${getIncreaseDecrease(chartData) > 0 ? 'text-green-300' : 'text-red-300'} font-bold`}>
         {getIncreaseDecrease(chartData) > 0 ? '+' : ''}${getIncreaseDecrease(chartData).toFixed(2)}  {"(" + getPercentageIncreaseDecrease(chartData).toFixed(4) + "%" + ")"} </p>
       </div>
       <div className="flex items-center gap-2 leading-none text-muted-foreground">
        Date range: {chartData[0]?.time} - {chartData[chartData.length - 1]?.time}
       </div>
      </div>
     </div>
    </CardFooter>
   </Card>
  </div>
 )
}
