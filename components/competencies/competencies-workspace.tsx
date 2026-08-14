"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Layers, TrendingUp, Award } from "lucide-react"
import { CompetencyCard } from "./competency-card"
import { AREA_META, COMPETENCIES, type Competency } from "./competencies-data"

type AreaFilter = "todas" | Competency["area"]

const FILTERS: { key: AreaFilter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "Tecnica", label: "Tecnica" },
  { key: "Interpessoal", label: "Interpessoal" },
  { key: "Pesquisa", label: "Pesquisa" },
  { key: "Gestao", label: "Gestao" },
]

export function CompetenciesWorkspace() {
  const [area, setArea] = useState<AreaFilter>("todas")

  const filtered = useMemo(() => {
    const list = area === "todas" ? COMPETENCIES : COMPETENCIES.filter((c) => c.area === area)
    return [...list].sort((a, b) => b.level - a.level)
  }, [area])

  const totalEvidences = COMPETENCIES.reduce((sum, c) => sum + c.evidences.length, 0)
  const avg = Math.round(COMPETENCIES.reduce((sum, c) => sum + c.level, 0) / COMPETENCIES.length)
  const advanced = COMPETENCIES.filter((c) => c.level >= 80).length

  const stats = [
    { icon: Layers, label: "Competencias mapeadas", value: String(COMPETENCIES.length) },
    { icon: Award, label: "Experiencias conectadas", value: String(totalEvidences) },
    { icon: TrendingUp, label: "Nivel medio", value: `${avg}%` },
    { icon: Sparkles, label: "Em nivel avancado", value: String(advanced) },
  ]

  return (
    <div className="space-y-6">
      {/* Insight banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </span>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Suas experiencias viram competencias reais</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Cada projeto, disciplina, estagio e competicao da sua trajetoria foi analisado para
              revelar as competencias que voce vem desenvolvendo. Explore a origem de cada uma.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <s.icon className="size-4 text-primary" />
              </span>
              <div>
                <p className="font-mono text-lg font-semibold leading-none">{s.value}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const active = area === f.key
          const meta = f.key !== "todas" ? AREA_META[f.key] : null
          return (
            <Button
              key={f.key}
              variant={active ? "default" : "outline"}
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => setArea(f.key)}
            >
              {meta && (
                <span
                  className={`size-1.5 rounded-full ${active ? "bg-primary-foreground" : meta.dot}`}
                />
              )}
              {f.label}
            </Button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <CompetencyCard key={c.id} competency={c} />
        ))}
      </div>
    </div>
  )
}
