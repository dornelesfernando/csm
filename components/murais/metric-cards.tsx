import { Card, CardContent } from "@/components/ui/card"
import { Tv, FileCheck2, Clock, Building2, type LucideIcon } from "lucide-react"
import { TELAS, CONTEUDOS, CENTROS } from "./murais-data"

type Metric = {
  label: string
  value: string
  hint: string
  icon: LucideIcon
  text: string
  bg: string
  trend?: string
}

function buildMetrics(): Metric[] {
  const online = TELAS.filter((t) => t.status === "online").length
  const ativos = CONTEUDOS.filter((c) => c.status === "ativo").length
  const pendentes = CONTEUDOS.filter(
    (c) => c.status === "rascunho" || c.status === "agendado",
  ).length

  return [
    {
      label: "Telas Online",
      value: `${online}/${TELAS.length}`,
      hint: `${TELAS.length - online} fora do ar`,
      icon: Tv,
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      trend: "Estavel",
    },
    {
      label: "Conteudos Ativos",
      value: String(ativos),
      hint: "Em exibicao agora",
      icon: FileCheck2,
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      trend: "+3 esta semana",
    },
    {
      label: "Conteudos Pendentes",
      value: String(pendentes),
      hint: "Rascunhos e agendados",
      icon: Clock,
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      trend: "Aguardando revisao",
    },
    {
      label: "Predios / Centros",
      value: String(CENTROS.length),
      hint: "Cobertos pela rede",
      icon: Building2,
      text: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10",
      trend: "6 regioes",
    },
  ]
}

export function MetricCards() {
  const metrics = buildMetrics()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => (
        <Card key={m.label} className="bg-card">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${m.bg}`}
              >
                <m.icon className={`size-5 ${m.text}`} />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">
                {m.trend}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold leading-none tracking-tight">
              {m.value}
            </p>
            <p className="mt-1.5 text-sm font-medium">{m.label}</p>
            <p className="text-xs text-muted-foreground">{m.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
