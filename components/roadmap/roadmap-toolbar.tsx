"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { type CourseStatus, type CourseType } from "./roadmap-data"

export type RoadmapFilter =
  | "all"
  | CourseType
  | Extract<CourseStatus, "approved" | "planned" | "failed" | "current">

const FILTERS: { value: RoadmapFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "required", label: "Obrigatorias" },
  { value: "elective", label: "Eletivas" },
  { value: "approved", label: "Concluidas" },
  { value: "planned", label: "Planejadas" },
  { value: "failed", label: "Reprovadas" },
  { value: "current", label: "Em andamento" },
]

type RoadmapToolbarProps = {
  query: string
  onQueryChange: (value: string) => void
  filter: RoadmapFilter
  onFilterChange: (value: RoadmapFilter) => void
}

export function RoadmapToolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
}: RoadmapToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative sm:max-w-xs sm:flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Pesquisar disciplina..."
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onFilterChange(item.value)}
            className="rounded-full"
          >
            <Badge
              variant={filter === item.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer font-normal",
                filter !== item.value && "hover:bg-muted",
              )}
            >
              {item.label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  )
}
