"use client"

import { useState } from "react"
import { Copy, Check, ArrowRight, Download, Sparkles } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const headlineSuggestions = [
  "Computer Science Student @ UNI | Backend Developer | Building Nexus SM",
  "Software Engineering Student | Node.js & PostgreSQL | Open to Internships",
  "CS Undergraduate | Full-Stack Developer | Research in Data Optimization",
]

// Competencias ja mapeadas no dashboard -> termos sugeridos para o LinkedIn
const skillSync = [
  { mapped: "TypeScript", suggested: "Desenvolvimento Full-Stack" },
  { mapped: "Prisma", suggested: "REST APIs" },
  { mapped: "PostgreSQL", suggested: "Modelagem de Dados" },
  { mapped: "Node.js", suggested: "Resolucao de Problemas" },
]

export function ProfileOptimizer() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  function copyHeadline(text: string, index: number) {
    navigator.clipboard?.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Card 1: Headline & Sobre */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Headline &amp; Sobre</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Titulo atual
            </p>
            <p className="mt-1 text-sm">Estudante de Ciencia da Computacao</p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="size-4 text-primary" />
            Sugestoes da IA
          </div>

          <div className="flex flex-col gap-2.5">
            {headlineSuggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg border border-border p-3"
              >
                <p className="flex-1 text-sm leading-relaxed">{suggestion}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 shrink-0 text-muted-foreground hover:text-primary"
                  onClick={() => copyHeadline(suggestion, i)}
                  aria-label="Copiar sugestao"
                >
                  {copiedIndex === i ? (
                    <Check className="size-4 text-primary" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Skill Syncer (ATS) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Skill Syncer
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              Otimizacao para ATS
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>No seu dashboard</span>
            <span />
            <span>Sugerido no LinkedIn</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {skillSync.map((row) => (
              <div
                key={row.mapped}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
              >
                <Badge
                  variant="secondary"
                  className="justify-center bg-primary/10 py-1 font-normal text-primary"
                >
                  {row.mapped}
                </Badge>
                <ArrowRight className="size-4 text-muted-foreground" />
                <Badge
                  variant="outline"
                  className="justify-center border-dashed py-1 font-normal"
                >
                  {row.suggested}
                </Badge>
              </div>
            ))}
          </div>

          <Separator />

          <Button variant="secondary" className="gap-2">
            <Download className="size-4" />
            Exportar lista de competencias
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
