"use client"

import { useMemo, useState } from "react"
import { Search, TrendingUp, Sparkles, LayoutGrid, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { categories, tools } from "./toolkit-data"
import { ToolCard } from "./tool-card"
import { QuickAccess } from "./quick-access"
import { cn } from "@/lib/utils"

export function ToolkitCatalog() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        !activeCategory || tool.category === activeCategory
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  const isSearching = query.trim() !== "" || activeCategory !== null

  const mostUsed = useMemo(
    () => [...tools].sort((a, b) => (b.uses ?? 0) - (a.uses ?? 0)).slice(0, 3),
    [],
  )
  const novelties = useMemo(() => tools.filter((t) => t.isNew), [])

  return (
    <div className="flex flex-col gap-8">
      {/* Search + filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar ferramentas academicas..."
            className="h-11 pl-9 text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Limpar busca"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeCategory === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <LayoutGrid className="size-3.5" />
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.label ? null : cat.label,
                )
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat.label
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <span className={cn("size-2 rounded-full", cat.color)} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Acesso Rapido / Favoritos (only when not searching) */}
      {!isSearching && <QuickAccess />}

      {/* Featured sections (only when not searching) */}
      {!isSearching && (
        <>
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Mais Utilizadas
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mostUsed.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Novidades
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {novelties.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Full catalog */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="size-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {isSearching ? "Resultados" : "Todas as Ferramentas"}
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "ferramenta" : "ferramentas"}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
            <Search className="size-8 text-muted-foreground/50" />
            <p className="text-sm font-medium">Nenhuma ferramenta encontrada</p>
            <p className="text-xs text-muted-foreground">
              Tente outra busca ou remova os filtros aplicados.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                setQuery("")
                setActiveCategory(null)
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
