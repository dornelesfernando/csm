"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowRight } from "lucide-react"
import { CATEGORIES } from "@/components/timeline/timeline-data"
import { AREA_META, type Competency } from "./competencies-data"

export function CompetencyCard({ competency }: { competency: Competency }) {
  const area = AREA_META[competency.area]

  return (
    <Card className="bg-card transition-colors hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold leading-tight text-balance">
              {competency.name}
            </h3>
            <Badge
              variant="secondary"
              className={`gap-1.5 border-0 ${area.bg} ${area.text} text-[11px] font-medium`}
            >
              <span className={`size-1.5 rounded-full ${area.dot}`} />
              {area.label}
            </Badge>
          </div>
          <span className="flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-emerald-600">
            <TrendingUp className="size-3" />
            {competency.trend}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {competency.levelLabel}
            </span>
            <span className="font-mono text-sm font-semibold">
              {competency.level}%
            </span>
          </div>
          <Progress value={competency.level} className="h-1.5" />
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {competency.summary}
        </p>

        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Experiencias que geraram esta competencia
          </p>
          <ul className="space-y-1.5">
            {competency.evidences.map((ev) => {
              const cat = CATEGORIES[ev.category]
              const Icon = cat.icon
              return (
                <li
                  key={ev.title}
                  className="flex items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5"
                >
                  <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded ${cat.bg}`}
                  >
                    <Icon className={`size-3.5 ${cat.text}`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{ev.title}</p>
                    {ev.detail && (
                      <p className="truncate text-[11px] text-muted-foreground">
                        {cat.label} · {ev.detail}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
