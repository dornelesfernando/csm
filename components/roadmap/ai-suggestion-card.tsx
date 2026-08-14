"use client"

import { Plus, Info, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { suggestionCatalog, type AISuggestion } from "./roadmap-data"

type AISuggestionCardProps = {
  suggestion: AISuggestion
  onAdd: (courseId: string) => void
  onIgnore: (courseId: string) => void
}

export function AISuggestionCard({
  suggestion,
  onAdd,
  onIgnore,
}: AISuggestionCardProps) {
  const course = suggestionCatalog[suggestion.courseId]
  if (!course) return null

  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium leading-tight">{course.name}</p>
          <span className="text-xs text-muted-foreground">
            {course.code} • {course.workload}h
          </span>
        </div>
        <Badge variant="outline" className="shrink-0 text-xs font-normal">
          IA
        </Badge>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {suggestion.reason}
      </p>
      <div className="mt-2.5 flex items-center gap-1.5">
        <Button
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => onAdd(suggestion.courseId)}
        >
          <Plus className="size-3.5" />
          Adicionar
        </Button>
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs">
          <Info className="size-3.5" />
          Detalhes
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 gap-1 px-2 text-xs text-muted-foreground"
          onClick={() => onIgnore(suggestion.courseId)}
        >
          <X className="size-3.5" />
          Ignorar
        </Button>
      </div>
    </div>
  )
}
