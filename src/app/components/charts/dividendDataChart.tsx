
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { DividendInfo } from "../../../interfaces/dividends.interface";

function getIncreaseDecreasePercentage(initialValue: number, finalValue: number) {
 return (((finalValue - initialValue) / initialValue) * 100).toFixed(2)
}

export default function DividendDataChart({ title, data, label, barColor }: Readonly<{ title: string, stockTicker: string, data: DividendInfo["results"], label: string, barColor: string }>) {

 function generateChartData(
  data: DividendInfo["results"],
 ) {
  if (!data) return []
  const chartData = data
   .map(({ cash_amount, ex_dividend_date }) => {
    return {
     ex_dividend_date,
     cash_amount
    };
   })
   .reverse();
  return chartData;
 }

 const chartData = generateChartData(data)

 const chartConfig = {
  cash_amount: {
   label: label,
  },
 } satisfies ChartConfig

 return <>
  {chartData.length > 0 ? (
   <Card>
    <CardHeader>
     <CardTitle>{title}</CardTitle>
     <CardDescription>Dividend per share holded</CardDescription>
    </CardHeader>
    <CardContent>
     <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
       <CartesianGrid vertical={false} />
       <XAxis
        dataKey="ex_dividend_date"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value}
       />
       <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent labelFormatter={(value) => <span className="text-gray-400">Ex dividend date: <strong className="text-gray-100">{value}</strong></span>} />}
       />
       <YAxis />
       <Bar dataKey="cash_amount" fill={barColor} radius={8} />
      </BarChart>
     </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2 text-sm">
     <div className="flex gap-2 items-center justify-center">
      {chartData.length === 20 ? Array.from({ length: 5 }, (_, i) => (
       <span key={i} className="px-3 text-xs py-2 rounded-xl bg-gray-700/80 text-gray-100">
        {i + 1}Y: <strong>{getIncreaseDecreasePercentage(chartData[Math.abs(i - 4) * 4]?.cash_amount, chartData.slice(-1)[0]?.cash_amount)}%</strong>
       </span>
      )) : null}
     </div>
    </CardFooter>
   </Card>
  ) : null}
 </>


}