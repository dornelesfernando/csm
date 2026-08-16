"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { DollarSign, Factory, TrendingUp, CircleAlert as AlertCircle } from "lucide-react"
import { LancamentoFinanceiroDialog } from "@/components/forms/lancamento-financeiro-dialog"

const kpis = [
  {
    title: "Faturamento Mensal",
    value: "R$ 248.500",
    change: "+12% vs mes anterior",
    icon: DollarSign,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Custos de Fabrica",
    value: "R$ 156.200",
    change: "62.8% do faturamento",
    icon: Factory,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Margem Contribuicao",
    value: "37.2%",
    change: "+2.1pp vs meta",
    icon: TrendingUp,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Valor em Aberto",
    value: "R$ 42.800",
    change: "3 faturas pendentes",
    icon: AlertCircle,
    color: "bg-amber-100 text-amber-600",
  },
]

const contratos = [
  {
    id: "CTR-001",
    cliente: "TechCorp Brasil",
    avatar: "TC",
    valor: 120000,
    horasContratadas: 500,
    horasConsumidas: 420,
    status: "vigente",
    faturamento: "Em dia",
  },
  {
    id: "CTR-002",
    cliente: "Startup XYZ",
    avatar: "SX",
    valor: 85000,
    horasContratadas: 350,
    horasConsumidas: 380,
    status: "estourado",
    faturamento: "Pendente",
  },
  {
    id: "CTR-003",
    cliente: "Banco Nacional",
    avatar: "BN",
    valor: 250000,
    horasContratadas: 1000,
    horasConsumidas: 650,
    status: "vigente",
    faturamento: "Em dia",
  },
  {
    id: "CTR-004",
    cliente: "Logistica SA",
    avatar: "LS",
    valor: 45000,
    horasContratadas: 200,
    horasConsumidas: 195,
    status: "vigente",
    faturamento: "Em dia",
  },
  {
    id: "CTR-005",
    cliente: "E-commerce Plus",
    avatar: "EP",
    valor: 180000,
    horasContratadas: 750,
    horasConsumidas: 820,
    status: "estourado",
    faturamento: "Atrasado",
  },
  {
    id: "CTR-006",
    cliente: "Consultoria ABC",
    avatar: "CA",
    valor: 62000,
    horasContratadas: 280,
    horasConsumidas: 140,
    status: "vigente",
    faturamento: "Em dia",
  },
]

const burnRateData = [
  { mes: "Set", contratadas: 2800, faturadas: 2650 },
  { mes: "Out", contratadas: 2900, faturadas: 2780 },
  { mes: "Nov", contratadas: 3100, faturadas: 2950 },
  { mes: "Dez", contratadas: 2600, faturadas: 2700 },
  { mes: "Jan", contratadas: 3200, faturadas: 3050 },
  { mes: "Fev", contratadas: 3080, faturadas: 2890 },
]

const chartConfig = {
  contratadas: { label: "Horas Contratadas", color: "#3b82f6" },
  faturadas: { label: "Horas Faturadas", color: "#10b981" },
}

function getConsumoPercent(consumidas: number, contratadas: number) {
  return Math.min(100, Math.round((consumidas / contratadas) * 100))
}

function getStatusBorder(status: string) {
  return status === "vigente" ? "border-l-blue-500" : "border-l-red-500"
}

function getFaturamentoBadge(status: string) {
  switch (status) {
    case "Em dia":
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Em dia</Badge>
    case "Pendente":
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pendente</Badge>
    case "Atrasado":
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Atrasado</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-sm text-muted-foreground">
            Gestao de Contratos e Custos
          </p>
        </div>
        <LancamentoFinanceiroDialog />
      </div>

      {/* KPIs Financeiros */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`flex size-12 items-center justify-center rounded-lg ${kpi.color}`}>
                  <kpi.icon className="size-6" />
                </div>
                <div>
                  <p className="text-xl font-bold font-mono">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.title}</p>
                  <p className="text-[10px] text-muted-foreground">{kpi.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tabela de Contratos */}
        <Card className="bg-card lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Contratos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="w-[180px]">Consumo Horas</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contratos.map((contrato) => {
                    const consumoPercent = getConsumoPercent(
                      contrato.horasConsumidas,
                      contrato.horasContratadas
                    )
                    return (
                      <TableRow
                        key={contrato.id}
                        className={`border-l-4 ${getStatusBorder(contrato.status)}`}
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {contrato.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="size-7">
                              <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                                {contrato.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{contrato.cliente}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          R$ {contrato.valor.toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span className="text-muted-foreground">
                                {contrato.horasConsumidas}h / {contrato.horasContratadas}h
                              </span>
                              <span className={`font-mono font-medium ${
                                consumoPercent > 100 ? "text-red-600" :
                                consumoPercent > 85 ? "text-amber-600" : "text-emerald-600"
                              }`}>
                                {consumoPercent}%
                              </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                              <div
                                className={`h-full transition-all ${
                                  consumoPercent > 100 ? "bg-red-500" :
                                  consumoPercent > 85 ? "bg-amber-500" : "bg-blue-500"
                                }`}
                                style={{ width: `${Math.min(100, consumoPercent)}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getFaturamentoBadge(contrato.faturamento)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Burn Rate Chart */}
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Burn Rate - 6 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart
                data={burnRateData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorContratadas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFaturadas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="contratadas"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorContratadas)"
                />
                <Area
                  type="monotone"
                  dataKey="faturadas"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorFaturadas)"
                />
              </AreaChart>
            </ChartContainer>
            <div className="mt-4 flex justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">Horas Contratadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Horas Faturadas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
