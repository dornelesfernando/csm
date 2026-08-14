"use client"

import { Search, X, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { eventCategories, type EventCategory } from "./event-data"

interface EventFiltersProps {
  query: string
  onQueryChange: (value: string) => void
  activeCategories: EventCategory[]
  onToggleCategory: (category: EventCategory) => void
}

export function EventFilters({
  query,
  onQueryChange,
  activeCategories,
  onToggleCategory,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar eventos, instituicoes ou temas..."
          className="h-11 pl-9 text-sm"
          aria-label="Buscar eventos"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Limpar busca"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <SlidersHorizontal className="size-3.5" />
          Filtrar por
        </span>
        {eventCategories.map((cat) => {
          const active = activeCategories.includes(cat.value)
          const Icon = cat.icon
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onToggleCategory(cat.value)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" />
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
