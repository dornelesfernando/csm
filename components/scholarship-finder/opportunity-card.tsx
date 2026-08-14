import { CalendarClock, Clock, ExternalLink, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ScholarshipOpportunity } from "./scholarship-data"

interface OpportunityCardProps {
  opportunity: ScholarshipOpportunity
}

function matchTone(score: number) {
  if (score >= 90)
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  if (score >= 70)
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  return "bg-muted text-muted-foreground"
}

function daysUntil(deadline: string) {
  const today = new Date("2026-06-30T00:00:00")
  const target = new Date(`${deadline}T00:00:00`)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function daysSince(date: string) {
  const today = new Date("2026-06-30T00:00:00")
  const past = new Date(`${date}T00:00:00`)
  return Math.floor((today.getTime() - past.getTime()) / (1000 * 60 * 60 * 24))
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const remaining = daysUntil(opportunity.deadline)
  const closingSoon = remaining <= 5
  const published = daysSince(opportunity.publishedAt)

  return (
    <Card className="flex flex-col gap-4 p-5 transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground/70">
            {opportunity.institutionLogo ??
              opportunity.institution.slice(0, 2).toUpperCase()}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {opportunity.institution}
          </span>
        </div>
        <Badge
          className={cn(
            "shrink-0 border-0 font-semibold",
            matchTone(opportunity.matchScore),
          )}
        >
          {opportunity.matchScore}% Compativel
        </Badge>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-semibold leading-tight text-pretty">
          {opportunity.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {opportunity.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {opportunity.benefits.map((benefit) => (
          <span
            key={benefit}
            className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
          >
            {benefit}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {opportunity.requirements.map((req) => (
          <Badge key={req} variant="outline" className="text-[10px] font-normal">
            {req}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
        {closingSoon ? (
          <Badge variant="destructive" className="gap-1 text-[10px]">
            <CalendarClock className="size-3" />
            Encerra em {remaining} {remaining === 1 ? "dia" : "dias"}
          </Badge>
        ) : (
          <span className="inline-flex items-center gap-1">
            <CalendarClock className="size-3" />
            Encerra em {remaining} dias
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          Publicado ha {published} {published === 1 ? "dia" : "dias"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="flex-1 gap-1.5">
          <ExternalLink className="size-3.5" />
          Ver Edital
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-1.5">
          <Sparkles className="size-3.5" />
          Gerar Resumo com IA
        </Button>
      </div>
    </Card>
  )
}
