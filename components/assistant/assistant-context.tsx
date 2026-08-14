"use client"

import { Brain, Sparkles, GitBranch, Target, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"

const contextItems = [
  {
    icon: Activity,
    label: "Atividades registradas",
    value: "32 registros",
    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
  },
  {
    icon: Sparkles,
    label: "Competencias mapeadas",
    value: "8 competencias",
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: Target,
    label: "Objetivos ativos",
    value: "4 metas",
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  },
  {
    icon: GitBranch,
    label: "Linha do tempo",
    value: "3 anos de jornada",
    color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
  },
]

export function AssistantContext() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Brain className="size-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold leading-tight">Contexto do copiloto</h2>
          <p className="text-xs text-muted-foreground">O que o assistente conhece sobre voce</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {contextItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3"
          >
            <div className={`flex size-8 shrink-0 items-center justify-center rounded-md ${item.color}`}>
              <item.icon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.value}</p>
              <p className="truncate text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-pretty text-xs leading-relaxed text-muted-foreground">
        O Assistente Academico cruza seus dados para te ajudar a enxergar padroes, lacunas e
        oportunidades na sua propria trajetoria. Ele nao inventa - responde a partir do que voce registra.
      </p>
    </Card>
  )
}
