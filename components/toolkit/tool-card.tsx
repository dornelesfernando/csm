"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Lock, ChevronUp, History } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { AcademicTool } from "./toolkit-data"

const categoryColors: Record<string, string> = {
  "Curriculo e Carreira": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Pesquisa e Producao Cientifica":
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Planejamento Academico": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Oportunidades: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  Documentacao: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "Inteligencia Academica": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
}

export function ToolCard({ tool }: { tool: AcademicTool }) {
  const available = tool.status === "disponivel"
  const Icon = tool.icon

  const [voted, setVoted] = useState(false)
  const interestedCount = (tool.interested ?? 0) + (voted ? 1 : 0)

  return (
    <Card
      className={cn(
        "group relative flex flex-col gap-4 p-5 transition-all hover:shadow-md",
        available
          ? "border-primary/30 bg-primary/[0.02] hover:border-primary/50"
          : "hover:border-border",
      )}
    >
      {available && (
        <span className="absolute right-0 top-0 size-16 overflow-hidden">
          <span className="absolute right-[-34px] top-[14px] w-[120px] rotate-45 bg-primary py-0.5 text-center text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
            Ativo
          </span>
        </span>
      )}

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            available
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-5" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="truncate font-semibold leading-tight">{tool.name}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {tool.tagline}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {tool.description}
      </p>

      {/* Historico recente: somente em ferramentas ativas */}
      {available && tool.lastUsed && (
        <div className="mt-auto flex items-center gap-1.5 border-t border-border/60 pt-3 text-[11px] text-muted-foreground/80">
          <History className="size-3" />
          <span>{tool.lastUsed}</span>
        </div>
      )}

      {available ? (
        <div
          className={cn(
            "flex items-center justify-between gap-2 pt-1",
            tool.lastUsed ? "" : "mt-auto",
          )}
        >
          <Badge
            variant="secondary"
            className={cn("font-normal", categoryColors[tool.category])}
          >
            {tool.category}
          </Badge>
          <Button size="sm" className="h-8 gap-1.5" asChild>
            <Link href={`/toolkit/${tool.id}`}>
              Abrir
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="secondary"
              className={cn("font-normal", categoryColors[tool.category])}
            >
              {tool.category}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3" />
              Em breve
            </span>
          </div>
          {/* Mural de votacao: incentiva o usuario a priorizar o roadmap */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setVoted((v) => !v)}
            aria-pressed={voted}
            className={cn(
              "h-8 w-full gap-1.5 text-xs transition-colors",
              voted
                ? "border-primary bg-primary/10 text-primary hover:bg-primary/15"
                : "text-muted-foreground hover:border-primary/50 hover:text-primary",
            )}
          >
            <ChevronUp
              className={cn(
                "size-3.5 transition-transform",
                voted && "-translate-y-0.5",
              )}
            />
            {interestedCount} interessados
            {!voted && (
              <span className="ml-0.5 hidden text-muted-foreground/70 sm:inline">
                · Tenho interesse
              </span>
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}
