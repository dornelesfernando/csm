"use client"

import { useMemo, useState } from "react"
import { Search, Sparkles, BookMarked } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  type Memory,
  type MemoryType,
  initialMemories,
  memoryTypes,
} from "./memory-data"
import { QuickCapture } from "./quick-capture"
import { MemoryCard } from "./memory-card"

const dayOrder = ["Hoje", "Ontem", "Esta semana"]

export function MemoryWorkspace() {
  const [memories, setMemories] = useState<Memory[]>(initialMemories)
  const [query, setQuery] = useState("")
  const [activeType, setActiveType] = useState<MemoryType | "todas">("todas")

  function handleCreate(memory: Memory) {
    setMemories((prev) => [memory, ...prev])
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return memories.filter((m) => {
      const matchesType = activeType === "todas" || m.type === activeType
      const matchesQuery =
        !q ||
        m.text.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.type.toLowerCase().includes(q) ||
        (m.course?.toLowerCase().includes(q) ?? false)
      return matchesType && matchesQuery
    })
  }, [memories, query, activeType])

  const grouped = useMemo(() => {
    const groups: Record<string, Memory[]> = {}
    for (const m of filtered) {
      groups[m.dayLabel] = groups[m.dayLabel] ?? []
      groups[m.dayLabel].push(m)
    }
    return Object.entries(groups).sort(
      (a, b) => dayOrder.indexOf(a[0]) - dayOrder.indexOf(b[0]),
    )
  }, [filtered])

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      {/* Coluna principal */}
      <div className="flex flex-col gap-5">
        <QuickCapture onCreate={handleCreate} />

        {/* Busca semantica */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise por significado, tema ou palavra-chave..."
            className="h-11 border-border bg-card pl-9"
          />
          {query && (
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[10px] font-medium text-primary">
              <Sparkles className="size-3" />
              busca semantica
            </span>
          )}
        </div>

        {/* Filtros por tipo */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveType("todas")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeType === "todas"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            Todas
          </button>
          {memoryTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setActiveType(t.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                activeType === t.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <span className={cn("size-1.5 rounded-full", t.dot)} />
              {t.value}
            </button>
          ))}
        </div>

        {/* Historico de memorias */}
        {grouped.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
            <BookMarked className="size-8 text-muted-foreground/50" />
            <p className="text-sm font-medium">Nenhuma memoria encontrada</p>
            <p className="text-xs text-muted-foreground">
              Ajuste a busca ou registre uma nova memoria acima.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {grouped.map(([day, items]) => (
              <section key={day} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {day}
                  </h2>
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-[10px] text-muted-foreground">
                    {items.length} {items.length === 1 ? "registro" : "registros"}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((memory) => (
                    <MemoryCard key={memory.id} memory={memory} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* Coluna lateral: panorama */}
      <aside className="hidden flex-col gap-4 lg:flex">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-medium">Panorama</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-2xl font-semibold tabular-nums">{memories.length}</p>
              <p className="text-[11px] text-muted-foreground">memorias totais</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-2xl font-semibold tabular-nums">
                {memories.filter((m) => m.dayLabel === "Hoje").length}
              </p>
              <p className="text-[11px] text-muted-foreground">registradas hoje</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-medium">Distribuicao</h3>
          <div className="flex flex-col gap-2.5">
            {memoryTypes.map((t) => {
              const count = memories.filter((m) => m.type === t.value).length
              const pct = memories.length ? (count / memories.length) * 100 : 0
              return (
                <div key={t.value} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span className={cn("size-2 rounded-full", t.dot)} />
                      {t.value}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", t.dot)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="text-sm font-medium">Dica de captura</h3>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Registre logo apos a aula ou o projeto. Memorias curtas e frequentes
            constroem uma trajetoria mais rica do que textos longos esporadicos.
          </p>
        </div>
      </aside>
    </div>
  )
}
