"use client"

import { useEffect, useState } from "react";
import { getPrices } from "../../../services/getPrices";
import { AggregateInfo } from "../../../interfaces/aggregates.interface";
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

function getDayMonth(date: number) {
  const d = new Date(date)
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`
}

function processPrices(timestamp: string, data: AggregateInfo["results"]) {
  if (!data) return []
  return data.map((price) => ({
    time: (timestamp === '1d' ? getHoursMinutes(price.t) : getDayMonth(price.t)).toString(),
    stockPrice: price.c.toString(),
  }))
}

function getMinAndMax(data: { stockPrice: string }[]) {
  if (!data) return [0, 0]
  const prices: number[] = data.map((price) => Number(price.stockPrice))
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

function getPriceParams(timestamp: string): { multiplier: string, selectedTimespan: string, from: string, to: string } {
  const today = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const todayMinusOneWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const todayMinusOneMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
  const todayMinusThreeMonths = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
  const todayMinusOneYear = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)
  const formatDate = (date: Date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  let params = { multiplier: "5", selectedTimespan: "minute", from: formatDate(yesterday), to: formatDate(yesterday) };

  if (timestamp === "1w") {
    params = { multiplier: "1", selectedTimespan: "hour", from: formatDate(todayMinusOneWeek), to: formatDate(today) }
  }
  if (timestamp === "1m") {
    params = { multiplier: "1", selectedTimespan: "day", from: formatDate(todayMinusOneMonth), to: formatDate(today) }
  }
  if (timestamp === "3m") {
    params = { multiplier: "1", selectedTimespan: "day", from: formatDate(todayMinusThreeMonths), to: formatDate(today) }
  }
  if (timestamp === "1y") {
    params = { multiplier: "1", selectedTimespan: "day", from: formatDate(todayMinusOneYear), to: formatDate(today) }
  }
  return params;
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
    const { multiplier, selectedTimespan, from, to } = getPriceParams(timespan)
    getPrices({
      stockTicker,
      multiplier,
      timespan: selectedTimespan,
      from,
      to
    }).then((data) => {
      setChartData(processPrices(timespan, data));
      setMin(getMinAndMax(processPrices(timespan, data))[0]);
      setMax(getMinAndMax(processPrices(timespan, data))[1]);
    }).catch((error) => {
      console.error("Error fetching stock prices", error);
    })
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
          {chartData && <ChartContainer config={chartConfig}>
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
                tickFormatter={(value) => {
                  if (timespan === "1d") {
                    return value
                  } else {
                    return value.toString().slice(0, 5)
                  }
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <YAxis hide domain={[min * 0.999, max * 1.001]} />
              <Line type="monotone" dataKey="stockPrice" stroke={`${getIncreaseDecrease(chartData) > 0 ? 'green' : 'red'}`} strokeWidth={3} dot={false} />
            </LineChart>
          </ChartContainer>}
          {chartData.length === 0 && <div className="text-4xl font-bold text-center">No results for today!</div>}
        </CardContent>
        <CardFooter>
          <div className="mb-8 flex gap-12 justify-center">
            <button
              className={`text-black font-bold px-6 py-2 rounded-3xl ${timespan === "1d" ? 'bg-gray-700/80 text-gray-50' : 'bg-white'}`}
              onClick={() => setTimespan("1d")}
            >
              1D
            </button>
            <button
              className={` text-black font-bold px-6 py-2 rounded-3xl ${timespan === "1w" ? 'bg-gray-700/80 text-gray-50' : 'bg-white'}`}
              onClick={() => setTimespan("1w")}
            >
              1W
            </button>
            <button
              className={` text-black font-bold px-6 py-2 rounded-3xl ${timespan === "1m" ? 'bg-gray-700/80 text-gray-50' : 'bg-white'}`}
              onClick={() => setTimespan("1m")}
            >
              1M
            </button>
            <button
              className={`text-black font-bold px-6 py-2 rounded-3xl ${timespan === "3m" ? 'bg-gray-700/80 text-gray-50' : 'bg-white'}`}
              onClick={() => setTimespan("3m")}
            >
              3M
            </button>
            <button
              className={`text-black font-bold px-6 py-2 rounded-3xl ${timespan === "1y" ? 'bg-gray-700/80 text-gray-50' : 'bg-white'}`}
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
