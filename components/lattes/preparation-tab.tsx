import {
  Briefcase,
  FlaskConical,
  Award,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  ChevronRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type LattesSection = {
  label: string
  icon: LucideIcon
  filled: number
  total: number
  pending: number
}

const sections: LattesSection[] = [
  { label: "Atuacao Profissional", icon: Briefcase, filled: 3, total: 5, pending: 1 },
  { label: "Pesquisa e Desenvolvimento", icon: FlaskConical, filled: 2, total: 3, pending: 1 },
  { label: "Premios e Titulos", icon: Award, filled: 4, total: 4, pending: 1 },
  { label: "Ensino", icon: GraduationCap, filled: 1, total: 2, pending: 1 },
  { label: "Extensao", icon: HeartHandshake, filled: 2, total: 2, pending: 0 },
  { label: "Formacao Complementar", icon: BookOpen, filled: 6, total: 8, pending: 1 },
]

export function PreparationTab() {
  return (
    <div className="space-y-5">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold tracking-tight">
          Preparacao do Curriculo
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          Organize as informacoes por secao antes de exporta-las para a
          Plataforma Lattes. Revise cada area e complete os registros pendentes.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon
          const value = Math.round((section.filled / section.total) * 100)
          return (
            <Card
              key={section.label}
              className="cursor-pointer p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight text-balance">
                      {section.label}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {section.filled} de {section.total} registros
                    </span>
                  </div>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </div>
              <Progress value={value} className="mt-3 h-1.5" />
              {section.pending > 0 && (
                <Badge
                  variant="secondary"
                  className="mt-3 border border-primary/20 bg-primary/10 text-xs font-normal text-primary"
                >
                  {section.pending} indicacao(oes) no Radar
                </Badge>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
