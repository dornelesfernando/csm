"use client"

import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  MapPin,
  Sparkles,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  categoryMetaMap,
  categoryShortLabel,
  type AcademicEvent,
} from "./event-data"

interface EventCardProps {
  event: AcademicEvent
  onToggleSave: (id: string) => void
}

function matchTone(score: number) {
  if (score >= 90) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  if (score >= 75) return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  return "bg-muted text-muted-foreground"
}

function formatDateRange(start: string, end?: string) {
  const startDate = new Date(`${start}T00:00:00`)
  const opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" }
  const startLabel = startDate.toLocaleDateString("pt-BR", opts)
  if (!end) return startLabel
  const endDate = new Date(`${end}T00:00:00`)
  return `${startLabel} - ${endDate.toLocaleDateString("pt-BR", opts)}`
}

export function EventCard({ event, onToggleSave }: EventCardProps) {
  const meta = categoryMetaMap[event.category]
  const Icon = meta.icon

  return (
    <Card className="group flex flex-col gap-4 p-5 transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg",
              meta.accent,
            )}
          >
            <Icon className="size-4" />
          </span>
          <Badge variant="secondary" className={cn("font-normal", meta.accent)}>
            {categoryShortLabel[event.category]}
          </Badge>
        </div>
        <Badge
          className={cn(
            "shrink-0 border-0 font-semibold",
            matchTone(event.matchScore),
          )}
        >
          {event.matchScore}% Compativel
        </Badge>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold leading-tight text-pretty">
          {event.title}
        </h3>
        <p className="text-xs font-medium text-muted-foreground">
          {event.institution}
          {event.location ? ` - ${event.location}` : ""}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
        {event.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {event.aiInsight && (
        <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/[0.04] p-3">
          <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              Insight da IA
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-pretty text-muted-foreground">
              {event.aiInsight}
            </p>
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CalendarClock className="size-3" />
          {event.deadlineLabel}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3" />
          {formatDateRange(event.startDate, event.endDate)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={event.saved ? "secondary" : "outline"}
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => onToggleSave(event.id)}
          aria-pressed={event.saved}
        >
          {event.saved ? (
            <>
              <BookmarkCheck className="size-3.5" />
              Salvo
            </>
          ) : (
            <>
              <Bookmark className="size-3.5" />
              Salvar no Calendario
            </>
          )}
        </Button>
        <Button size="sm" className="flex-1 gap-1.5">
          Ver detalhes
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </Card>
  )
}
