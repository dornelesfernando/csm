import { Clock, BookCheck, Layers, CalendarRange, TrendingUp, ListTodo, AlertTriangle } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { CircularProgress } from "./circular-progress"
import { type ProgressStats } from "./roadmap-data"

type ProgressCardsProps = {
  stats: ProgressStats
}

export function ProgressCards({ stats }: ProgressCardsProps) {
  const totalPct = Math.round(
    (stats.totalWorkload.done / stats.totalWorkload.total) * 100,
  )
  const electivePct = Math.round(
    (stats.electiveWorkload.done / stats.electiveWorkload.total) * 100,
  )
  const currentPct = Math.round(
    (stats.currentSemester.done / stats.currentSemester.total) * 100,
  )
  const overloaded = stats.currentSemester.done > stats.currentSemester.total

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {/* Carga horaria total */}
      <Card className="flex items-center gap-3 p-4">
        <CircularProgress value={totalPct} />
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            Carga Horaria
          </div>
          <p className="mt-0.5 text-sm font-semibold">
            {stats.totalWorkload.done} / {stats.totalWorkload.total}h
          </p>
        </div>
      </Card>

      {/* Obrigatorias */}
      <Card className="flex items-center gap-3 p-4">
        <CircularProgress value={stats.requiredPercent} />
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookCheck className="size-3" />
            Obrigatorias
          </div>
          <p className="mt-0.5 text-sm font-semibold">Concluidas</p>
        </div>
      </Card>

      {/* DCGs / Eletivas */}
      <Card className="flex items-center gap-3 p-4">
        <CircularProgress value={electivePct} />
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Layers className="size-3" />
            DCGs / Eletivas
          </div>
          <p className="mt-0.5 text-sm font-semibold">
            {stats.electiveWorkload.done} / {stats.electiveWorkload.total}h
          </p>
        </div>
      </Card>

      {/* Semestre atual */}
      <Card
        className={cn(
          "flex items-center gap-3 p-4",
          overloaded && "border-destructive/40 bg-destructive/5",
        )}
      >
        <CircularProgress
          value={currentPct}
          className={overloaded ? "stroke-destructive" : undefined}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {overloaded ? (
              <AlertTriangle className="size-3 text-destructive" />
            ) : (
              <CalendarRange className="size-3" />
            )}
            Semestre Atual
          </div>
          <p className="mt-0.5 text-sm font-semibold">
            {stats.currentSemester.done} / {stats.currentSemester.total}h
          </p>
        </div>
      </Card>

      {/* CR */}
      <Card className="flex flex-col justify-center p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="size-3" />
          CR
        </div>
        <p className="mt-1 text-2xl font-bold tracking-tight">
          {stats.gpa.toFixed(2)}
        </p>
        <span className="text-xs text-muted-foreground">Coeficiente</span>
      </Card>

      {/* Pendentes */}
      <Card className="flex flex-col justify-center p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ListTodo className="size-3" />
          Disciplinas
        </div>
        <p className="mt-1 text-2xl font-bold tracking-tight">
          {stats.pendingCourses}
        </p>
        <span className="text-xs text-muted-foreground">restantes</span>
      </Card>
    </div>
  )
}
