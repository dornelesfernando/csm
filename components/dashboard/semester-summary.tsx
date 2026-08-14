import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, BookOpen, Award, Flame } from "lucide-react"

const stats = [
  { label: "Disciplinas", value: "6", icon: BookOpen, color: "text-blue-600" },
  { label: "Registros no semestre", value: "34", icon: Award, color: "text-emerald-600" },
  { label: "Sequencia de registros", value: "12 dias", icon: Flame, color: "text-amber-600" },
]

export function SemesterSummary() {
  return (
    <Card className="overflow-hidden bg-card">
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-primary">
              <CalendarDays className="size-3.5" />
              Semestre atual
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-balance">
              2026.1 &middot; 5&ordm; Periodo
            </h2>
            <p className="max-w-md text-sm text-muted-foreground text-pretty">
              Voce esta construindo uma trajetoria solida. Continue registrando
              suas experiencias para revelar sua evolucao.
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Em andamento
          </Badge>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso do semestre</span>
            <span className="font-mono font-semibold">62%</span>
          </div>
          <Progress value={62} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Semana 10 de 16 &middot; 6 semanas restantes
          </p>
        </div>
      </div>

      <CardContent className="grid grid-cols-3 divide-x divide-border p-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 p-4">
            <stat.icon className={`size-4 ${stat.color}`} />
            <span className="mt-1 text-xl font-bold font-mono">{stat.value}</span>
            <span className="text-[11px] leading-tight text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
