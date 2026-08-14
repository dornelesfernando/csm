"use client"

import { useState } from "react"
import {
  Sparkles,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Star,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { AISuggestionCard } from "./ai-suggestion-card"
import { aiInsights, type AISuggestion, type AIInsight } from "./roadmap-data"

const INSIGHT_ICONS: Record<AIInsight["type"], LucideIcon> = {
  tip: Lightbulb,
  warning: AlertTriangle,
  progress: TrendingUp,
  star: Star,
}

const INSIGHT_TONE: Record<AIInsight["type"], string> = {
  tip: "text-amber-500",
  warning: "text-destructive",
  progress: "text-emerald-500",
  star: "text-primary",
}

type PlanningAssistantProps = {
  suggestions: AISuggestion[]
  onAdd: (courseId: string) => void
  onIgnore: (courseId: string) => void
  onAddAll: () => void
}

export function PlanningAssistant({
  suggestions,
  onAdd,
  onIgnore,
  onAddAll,
}: PlanningAssistantProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Card className="flex flex-col p-4 lg:w-80 lg:shrink-0">
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="flex items-start justify-between gap-2 text-left"
      >
        <div className="flex items-start gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">IA • Sugestao de Grade</h3>
            <p className="text-xs text-muted-foreground text-pretty">
              Com base no PPC, historico e carga horaria.
            </p>
          </div>
        </div>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            !collapsed && "rotate-90",
          )}
        />
      </button>

      {!collapsed && (
        <div className="mt-4 space-y-3">
          {suggestions.length > 0 ? (
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <AISuggestionCard
                  key={suggestion.courseId}
                  suggestion={suggestion}
                  onAdd={onAdd}
                  onIgnore={onIgnore}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
              Nenhuma sugestao pendente. A IA atualizara conforme seu progresso.
            </p>
          )}

          {suggestions.length > 0 && (
            <Button size="sm" className="w-full" onClick={onAddAll}>
              Adicionar todas ao 4o Semestre
            </Button>
          )}

          <Separator />

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Insights da IA
            </h4>
            {aiInsights.map((insight) => {
              const Icon = INSIGHT_ICONS[insight.type]
              return (
                <div key={insight.id} className="flex gap-2">
                  <Icon
                    className={cn(
                      "mt-0.5 size-3.5 shrink-0",
                      INSIGHT_TONE[insight.type],
                    )}
                  />
                  <p className="text-xs leading-relaxed text-foreground/85">
                    {insight.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}
