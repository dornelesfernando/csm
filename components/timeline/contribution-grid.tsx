"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Flame } from "lucide-react"

// Deterministic pseudo-random intensity grid (53 weeks x 7 days)
function buildGrid() {
  const weeks: number[][] = []
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let w = 0; w < 53; w++) {
    const days: number[] = []
    for (let d = 0; d < 7; d++) {
      const r = rand()
      // bias toward fewer contributions
      const level = r > 0.82 ? 4 : r > 0.68 ? 3 : r > 0.5 ? 2 : r > 0.3 ? 1 : 0
      days.push(level)
    }
    weeks.push(days)
  }
  return weeks
}

const LEVEL_CLASSES = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
]

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

export function ContributionGrid() {
  const weeks = buildGrid()
  const total = weeks.flat().reduce((sum, l) => sum + (l > 0 ? 1 : 0), 0)

  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Flame className="size-4 text-primary" />
            Atividade ao longo do ano
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {total} registros nos ultimos 12 meses
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider delayDuration={100}>
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max flex-col gap-2">
              {/* month labels */}
              <div className="flex gap-[3px] pl-1 text-[10px] text-muted-foreground">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="w-[calc(53px*0.84)] shrink-0">
                    {MONTHS[i]}
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <Tooltip key={di}>
                        <TooltipTrigger asChild>
                          <div
                            className={`size-[11px] rounded-[2px] ${LEVEL_CLASSES[level]}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          {level === 0
                            ? "Nenhum registro"
                            : `${level} ${level === 1 ? "registro" : "registros"}`}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
              {/* legend */}
              <div className="flex items-center justify-end gap-1.5 pt-1 text-[10px] text-muted-foreground">
                <span>Menos</span>
                {LEVEL_CLASSES.map((c, i) => (
                  <div key={i} className={`size-[11px] rounded-[2px] ${c}`} />
                ))}
                <span>Mais</span>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
