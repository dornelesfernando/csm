"use client"

import { useState } from "react"
import { ChevronDown, Sparkles, Calendar, Building2, Layers, Search } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

import { CATEGORY_META, type LattesSuggestion } from "./radar-data"
import { ConfidenceBadge } from "./confidence-badge"
import { SuggestionActions } from "./suggestion-actions"
import { SuggestionPreview } from "./suggestion-preview"

const FIELD_ICONS = [Calendar, Building2, Layers, Search]

type SuggestionCardProps = {
  suggestion: LattesSuggestion
  onPrepare: (id: string) => void
  onConfirm: (id: string) => void
  onIgnore: (id: string) => void
}

export function SuggestionCard({
  suggestion,
  onPrepare,
  onConfirm,
  onIgnore,
}: SuggestionCardProps) {
  const [open, setOpen] = useState(false)
  const category = CATEGORY_META[suggestion.category]
  const CategoryIcon = category.icon

  return (
    <Card className="overflow-hidden transition-colors hover:border-primary/30">
      <div className="p-4 sm:p-5">
        {/* Cabecalho */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
              <CategoryIcon className="size-4" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-1 text-xs font-normal">
                {category.label}
              </Badge>
              <h3 className="font-semibold leading-tight text-balance">
                {suggestion.title}
              </h3>
              {suggestion.subtitle && (
                <p className="text-sm text-muted-foreground">
                  {suggestion.subtitle}
                </p>
              )}
            </div>
          </div>
          <ConfidenceBadge confidence={suggestion.confidence} />
        </div>

        {/* Contexto da IA */}
        <div className="mt-3 flex gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground/85">
            {suggestion.aiContext}
          </p>
        </div>

        {/* Origem da informacao */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Detectado em:</span>
          {suggestion.detectedFrom.map((source) => (
            <Badge key={source} variant="outline" className="text-xs font-normal">
              {source}
            </Badge>
          ))}
        </div>

        {/* Informacoes detectadas */}
        <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3 sm:grid-cols-4">
          {suggestion.detectedFields.map((field, index) => {
            const Icon = FIELD_ICONS[index % FIELD_ICONS.length]
            return (
              <div key={field.label} className="min-w-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon className="size-3" />
                  {field.label}
                </div>
                <p className="mt-0.5 truncate text-sm font-medium" title={field.value}>
                  {field.value}
                </p>
              </div>
            )
          })}
        </div>

        {/* Estado expandido */}
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleContent className="mt-4">
            <SuggestionPreview suggestion={suggestion} />
          </CollapsibleContent>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <SuggestionActions
              onPrepare={() => onPrepare(suggestion.id)}
              onConfirm={() => onConfirm(suggestion.id)}
              onIgnore={() => onIgnore(suggestion.id)}
            />
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
              >
                {open ? "Ocultar detalhes" : "Ver detalhes"}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    open && "rotate-180",
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>
    </Card>
  )
}
