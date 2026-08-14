"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CATEGORIES,
  TIMELINE,
  type CategoryKey,
  type TimelineEntry,
} from "./timeline-data"
import { CalendarRange, Filter, X } from "lucide-react"

const PERIODS = ["2025.2", "2025.1", "2024.2"]
const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[]

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const cat = CATEGORIES[entry.category]
  const Icon = cat.icon
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {/* line + node */}
      <div className="relative flex flex-col items-center">
        <div
          className={`z-10 flex size-9 shrink-0 items-center justify-center rounded-full ${cat.bg}`}
        >
          <Icon className={`size-4 ${cat.text}`} />
        </div>
        <div className="absolute top-9 h-[calc(100%-1.25rem)] w-px bg-border" />
      </div>

      {/* content */}
      <Card className="flex-1 bg-card transition-colors hover:border-primary/40">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={`gap-1 border-none ${cat.bg} ${cat.text}`}
              >
                {cat.label}
              </Badge>
              {entry.meta && (
                <span className="text-xs font-medium text-muted-foreground">
                  {entry.meta}
                </span>
              )}
            </div>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {entry.dateLabel}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-balance">{entry.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            {entry.description}
          </p>
          {entry.tags && entry.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function TimelineFeed() {
  const [period, setPeriod] = useState<string>("todos")
  const [activeCategories, setActiveCategories] = useState<CategoryKey[]>([])

  const toggleCategory = (key: CategoryKey) => {
    setActiveCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    )
  }

  const filtered = useMemo(() => {
    return TIMELINE.filter((e) => {
      const periodOk = period === "todos" || e.period === period
      const catOk =
        activeCategories.length === 0 || activeCategories.includes(e.category)
      return periodOk && catOk
    })
  }, [period, activeCategories])

  // group by period preserving chronological order (data already sorted desc)
  const grouped = useMemo(() => {
    const map = new Map<string, TimelineEntry[]>()
    for (const e of filtered) {
      if (!map.has(e.period)) map.set(e.period, [])
      map.get(e.period)!.push(e)
    }
    return Array.from(map.entries())
  }, [filtered])

  const hasFilters = period !== "todos" || activeCategories.length > 0

  return (
    <div className="space-y-5">
      {/* filters */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="size-4 text-primary" />
            Filtros
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="h-8 w-[160px] text-sm">
              <CalendarRange className="size-3.5 text-muted-foreground" />
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os periodos</SelectItem>
              {PERIODS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-muted-foreground"
              onClick={() => {
                setPeriod("todos")
                setActiveCategories([])
              }}
            >
              <X className="size-3.5" />
              Limpar
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_KEYS.map((key) => {
            const cat = CATEGORIES[key]
            const active = activeCategories.includes(key)
            const Icon = cat.icon
            return (
              <button
                key={key}
                onClick={() => toggleCategory(key)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? `${cat.bg} ${cat.text} border-transparent`
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* results count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length}{" "}
        {filtered.length === 1 ? "registro encontrado" : "registros encontrados"}
      </p>

      {/* grouped timeline */}
      {grouped.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum registro para os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([periodLabel, entries]) => (
            <div key={periodLabel}>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold text-primary">
                  {periodLabel}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div>
                {entries.map((entry) => (
                  <TimelineItem key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
