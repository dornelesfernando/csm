"use client"

import { useMemo, useState } from "react"
import {
  Wand2,
  Check,
  X,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type RadarStatus = "Pendente" | "Rascunho" | "Publicado"

interface Opportunity {
  id: string
  category: string
  categoryColor: string
  title: string
  context: string
  status: RadarStatus
}

const initialOpportunities: Opportunity[] = [
  {
    id: "1",
    category: "Projeto Tecnico",
    categoryColor: "bg-blue-500/15 text-blue-400",
    title: "Atualizacao no Banco de Dados do Nexus SM",
    context:
      "Notei que voce finalizou a modelagem em PostgreSQL e TypeScript. Isso rende um otimo post tecnico sobre otimizacao estrutural.",
    status: "Pendente",
  },
  {
    id: "2",
    category: "Lideranca",
    categoryColor: "bg-amber-500/15 text-amber-400",
    title: "Encerramento do Processo Seletivo do Tau Rocket Team",
    context:
      "Voce liderou a selecao de novos membros. Um post sobre construcao de times multidisciplinares teria bom alcance.",
    status: "Rascunho",
  },
  {
    id: "3",
    category: "Evento",
    categoryColor: "bg-violet-500/15 text-violet-400",
    title: "Participacao no Hackathon de Inovacao Universitaria",
    context:
      "Sua equipe ficou em 1o lugar. Compartilhar os aprendizados da competicao reforca sua autoridade.",
    status: "Pendente",
  },
  {
    id: "4",
    category: "Projeto Tecnico",
    categoryColor: "bg-blue-500/15 text-blue-400",
    title: "Artigo aceito sobre otimizacao de queries",
    context:
      "Sua producao cientifica foi aceita. Publicacoes academicas geram engajamento qualificado na rede.",
    status: "Pendente",
  },
]

const statusStyles: Record<RadarStatus, string> = {
  Pendente: "bg-muted text-muted-foreground",
  Rascunho: "bg-amber-500/15 text-amber-400",
  Publicado: "bg-emerald-500/15 text-emerald-400",
}

const publishedHistory = [
  {
    title: "Como reduzi a latencia em 40% no Nexus SM",
    date: "12 jun 2026",
  },
  {
    title: "3 licoes da minha primeira iniciacao cientifica",
    date: "28 mai 2026",
  },
]

export function ContentRadar() {
  const [opportunities, setOpportunities] = useState(initialOpportunities)
  const [publishedThisMonth, setPublishedThisMonth] = useState(2)

  const pending = useMemo(
    () => opportunities.filter((o) => o.status !== "Publicado").length,
    [opportunities],
  )

  const conversionRate = useMemo(() => {
    const total = opportunities.length + publishedHistory.length
    const published =
      opportunities.filter((o) => o.status === "Publicado").length +
      publishedHistory.length
    return total ? Math.round((published / total) * 100) : 0
  }, [opportunities])

  function markPublished(id: string) {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Publicado" } : o)),
    )
    setPublishedThisMonth((n) => n + 1)
  }

  function ignore(id: string) {
    setOpportunities((prev) => prev.filter((o) => o.id !== id))
  }

  const metrics = [
    {
      label: "Sugestoes da IA",
      value: `${pending} pendentes`,
      icon: Lightbulb,
      color: "text-blue-400",
    },
    {
      label: "Posts publicados este mes",
      value: String(publishedThisMonth),
      icon: CheckCircle2,
      color: "text-emerald-400",
    },
    {
      label: "Taxa de conversao de ideias",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "text-primary",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Cabecalho de metricas */}
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted",
                  m.color,
                )}
              >
                <m.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-lg font-bold leading-tight">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de oportunidades */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Oportunidades sugeridas</h2>
        {opportunities.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Tudo em dia! Nenhuma sugestao pendente no momento.
            </CardContent>
          </Card>
        )}
        {opportunities.map((op) => (
          <Card key={op.id}>
            <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={cn("font-normal", op.categoryColor)}
                  >
                    {op.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={cn("font-normal", statusStyles[op.status])}
                  >
                    {op.status}
                  </Badge>
                </div>
                <p className="font-medium leading-snug">{op.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {op.context}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Button size="sm" className="gap-1.5" asChild>
                  <a href="?tab=gerador">
                    <Wand2 className="size-4" />
                    Gerar post
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="size-9 text-emerald-400 hover:text-emerald-300"
                  onClick={() => markPublished(op.id)}
                  disabled={op.status === "Publicado"}
                  aria-label="Marcar como publicado"
                >
                  <Check className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-9 text-muted-foreground hover:text-destructive"
                  onClick={() => ignore(op.id)}
                  aria-label="Ignorar ideia"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historico colapsavel */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="historico" className="border-none">
          <Card>
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
              Historico de publicacoes
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Publicacao</TableHead>
                    <TableHead className="w-32">Data</TableHead>
                    <TableHead className="w-24 text-right">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {publishedHistory.map((p) => (
                    <TableRow key={p.title}>
                      <TableCell className="font-medium">{p.title}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          Ver
                          <ExternalLink className="size-3" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
