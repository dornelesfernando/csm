"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { VOLUME_POR_CENTRO } from "./murais-data"

const chartConfig = {
  atualizacoes: {
    label: "Atualizacoes",
    color: "hsl(var(--chart-1))",
  },
  ativos: {
    label: "Ativos agora",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function UpdatesChart() {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <BarChart3 className="size-4 text-primary" />
          Volume de atualizacoes por centro
        </CardTitle>
        <CardDescription>
          Conteudos publicados e ativos nos ultimos 30 dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart accessibilityLayer data={VOLUME_POR_CENTRO} barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="centro"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={28}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="atualizacoes"
              fill="var(--color-atualizacoes)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="ativos"
              fill="var(--color-ativos)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
