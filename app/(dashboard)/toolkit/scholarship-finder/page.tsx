"use client"

import { useMemo, useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScholarshipHeader } from "@/components/scholarship-finder/scholarship-header"
import { SearchProfileCard } from "@/components/scholarship-finder/search-profile-card"
import { ScholarshipStats } from "@/components/scholarship-finder/scholarship-stats"
import { OpportunityGrid } from "@/components/scholarship-finder/opportunity-grid"
import { ScholarshipFilters } from "@/components/scholarship-finder/scholarship-filters"
import { SearchBar } from "@/components/scholarship-finder/search-bar"
import { KanbanBoard } from "@/components/scholarship-finder/kanban-board"
import {
  opportunities,
  sortOptions,
  type ScholarshipOpportunity,
  type SortOption,
} from "@/components/scholarship-finder/scholarship-data"

function parseValue(value?: string): number {
  if (!value) return 0
  const match = value.match(/\d+/)
  return match ? Number(match[0]) : 0
}

function sortOpportunities(
  list: ScholarshipOpportunity[],
  sort: SortOption,
): ScholarshipOpportunity[] {
  const copy = [...list]
  switch (sort) {
    case "match":
      return copy.sort((a, b) => b.matchScore - a.matchScore)
    case "recent":
      return copy.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
    case "deadline":
      return copy.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      )
    case "value":
      return copy.sort((a, b) => parseValue(b.value) - parseValue(a.value))
    case "alphabetical":
      return copy.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return copy
  }
}

export default function ScholarshipFinderPage() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortOption>("match")
  const [filters, setFilters] = useState<Record<string, string[]>>({})

  function toggleFilter(groupId: string, option: string) {
    setFilters((prev) => {
      const current = prev[groupId] ?? []
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option]
      return { ...prev, [groupId]: next }
    })
  }

  function clearFilters() {
    setFilters({})
  }

  function resetExplore() {
    setQuery("")
    setFilters({})
  }

  const recommended = useMemo(
    () =>
      sortOpportunities(
        opportunities.filter((o) => o.matchScore >= 80),
        "match",
      ),
    [],
  )

  const explored = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = opportunities.filter((o) => {
      const matchesQuery =
        !q ||
        o.title.toLowerCase().includes(q) ||
        o.institution.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q)

      const matchesState =
        !filters.state?.length || filters.state.includes(o.state)
      const matchesInstitution =
        !filters.institution?.length ||
        filters.institution.includes(o.institution)
      const matchesType =
        !filters.type?.length || filters.type.includes(o.category)
      const matchesModality =
        !filters.modality?.length || filters.modality.includes(o.modality)
      const matchesLevel =
        !filters.level?.length || filters.level.includes(o.level)

      return (
        matchesQuery &&
        matchesState &&
        matchesInstitution &&
        matchesType &&
        matchesModality &&
        matchesLevel
      )
    })
    return sortOpportunities(filtered, sort)
  }, [query, sort, filters])

  return (
    <div className="space-y-6">
      <ScholarshipHeader />
      <SearchProfileCard />
      <ScholarshipStats />

      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="recommended">Recomendados</TabsTrigger>
          <TabsTrigger value="explore">Explorar Todos</TabsTrigger>
          <TabsTrigger value="applications">Minhas Inscricoes</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="mt-6 duration-300 animate-in fade-in-50">
          <OpportunityGrid opportunities={recommended} onReset={resetExplore} />
        </TabsContent>

        <TabsContent value="explore" className="mt-6 duration-300 animate-in fade-in-50">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <ScholarshipFilters
                selected={filters}
                onToggle={toggleFilter}
                onClear={clearFilters}
              />
            </aside>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <SearchBar value={query} onChange={setQuery} />
                </div>
                <Select
                  value={sort}
                  onValueChange={(value) => setSort(value as SortOption)}
                >
                  <SelectTrigger className="h-11 w-full sm:w-52">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <OpportunityGrid
                opportunities={explored}
                onReset={resetExplore}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-6 duration-300 animate-in fade-in-50">
          <KanbanBoard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
