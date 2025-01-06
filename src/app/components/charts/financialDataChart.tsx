
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
 Card,
 CardContent,
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
import { FinancialInfo, FinancialInfoKeys } from "../../../interfaces/financials.interface";
import { generateChartData } from "../../../utils/generateChartData";

function getIncreaseDecreasePercentage(initialValue: number, finalValue: number) {
 return (((finalValue - initialValue) / initialValue) * 100).toFixed(2)
}

export default function FinancialDataChart({ title, data, label, barColor, dataToShow }: Readonly<{ title: string, stockTicker: string, data: FinancialInfo["results"], label: string, barColor: string, dataToShow: FinancialInfoKeys }>) {

 const chartData = generateChartData(data, dataToShow)
 const chartConfig = {
  financialInfo: {
   label: label,
  },
 } satisfies ChartConfig

 return <>
  {chartData.some((data) => data.financialInfo) ?
   (
    <Card>
     <CardHeader>
      <CardTitle>{title}</CardTitle>
     </CardHeader>
     <CardContent>
      <ChartContainer config={chartConfig}>
       <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
         dataKey="quarter"
         tickLine={false}
         tickMargin={10}
         axisLine={false}
         tickFormatter={(value) => value}
        />
        <ChartTooltip
         cursor={false}
         content={<ChartTooltipContent labelFormatter={(value) => <span className="text-gray-400">Fiscal period: <strong className="text-gray-100">{value}</strong></span>} />}
        />
        <Bar dataKey="financialInfo" fill={barColor} radius={8} />
       </BarChart>
      </ChartContainer>
     </CardContent>
     <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 items-center justify-center">
       {chartData.length === 20 ? Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="px-3 text-xs py-2 rounded-xl bg-gray-700/80 text-gray-100">
         {i + 1}Y: <strong>{getIncreaseDecreasePercentage(chartData[Math.abs(i - 4) * 4]?.financialInfo, chartData.slice(-1)[0]?.financialInfo)}%</strong>
        </span>
       )) : null}
      </div>
     </CardFooter>
    </Card>
   ) : null}
 </>
}