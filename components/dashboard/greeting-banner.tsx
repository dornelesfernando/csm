"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  Award,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type InsightType = "oportunidade" | "curiosidade"

type Insight = {
  id: string
  type: InsightType
  /** Mensagem curta, exibida sempre (colapsado) */
  headline: string
  /** Texto descritivo, exibido ao expandir */
  description: string
  /** Imagem/thumbnail (oportunidades) */
  thumbnail?: string
  /** Rotulo do botao primario (oportunidades) */
  ctaLabel?: string
  ctaHref?: string
  /** Meta-info (instituicao, prazo, etc.) */
  meta?: string
  /**
   * Contexto passado ao Assistente Academico. Ao clicar em "Explorar com
   * Assistente", o usuario e roteado para /assistente?context=<contextSeed>,
   * que inicia o chat ja com este assunto carregado.
   */
  contextSeed: string
}

const INSIGHTS: Insight[] = [
  {
    id: "edital-nexus",
    type: "oportunidade",
    headline:
      "Encontrei um edital de fomento em inovacao que se encaixa no escopo do Nexus SM!",
    description:
      "O edital PIBITI/CNPq 2026 abre apoio a projetos de inovacao tecnologica com foco em sistemas inteligentes. O escopo do seu projeto Nexus SM tem forte aderencia aos eixos avaliados, e o prazo de submissao ainda esta aberto.",
    thumbnail: "/images/edital-fomento.png",
    ctaLabel: "Ver Oportunidade",
    ctaHref: "/toolkit",
    meta: "CNPq - Inscricoes ate 28/06",
    contextSeed:
      "Quero entender como adaptar meu projeto Nexus SM para o edital de fomento em inovacao PIBITI/CNPq 2026. Por onde devo comecar?",
  },
  {
    id: "curiosidade-postgres",
    type: "curiosidade",
    headline:
      "Voce sabia que indices B-Tree no PostgreSQL podem reduzir a latencia em ate 40%?",
    description:
      "Em consultas com filtros por igualdade ou faixa, um indice B-Tree bem posicionado evita varreduras completas na tabela. Como voce esta desenvolvendo competencias em Banco de Dados, vale aplicar isso nas queries do seu projeto.",
    meta: "Dica conectada a sua competencia em Banco de Dados",
    contextSeed:
      "Me explique como usar indices B-Tree no PostgreSQL para otimizar queries e como aplicar isso no meu projeto.",
  },
  {
    id: "oportunidade-bolsa",
    type: "oportunidade",
    headline:
      "Uma bolsa de iniciacao cientifica combina com suas competencias em Pesquisa!",
    description:
      "O grupo de pesquisa em Sistemas Inteligentes abriu vaga de IC com bolsa. Seu historico em publicacoes e competicoes te coloca como candidata forte para o processo seletivo.",
    thumbnail: "/images/edital-fomento.png",
    ctaLabel: "Ver Bolsa",
    ctaHref: "/toolkit",
    meta: "Grupo de Sistemas Inteligentes - 1 vaga",
    contextSeed:
      "Quero me candidatar a uma bolsa de iniciacao cientifica em Sistemas Inteligentes. Como meu historico me ajuda e o que preciso preparar?",
  },
]

function buildGreeting(now: Date): string {
  const hour = now.getHours()
  const day = now.getDay()

  let period = "Ola"
  if (hour < 12) period = "Bom dia"
  else if (hour < 18) period = "Boa tarde"
  else period = "Boa noite"

  const dayMessages: Record<number, string> = {
    0: "domingo de recarregar as energias.",
    1: "comeco de ciclo, defina o foco da semana.",
    2: "terca de ritmo acelerado.",
    3: "quarta-feira, metade da jornada.",
    4: "quinta de produtividade, as entregas estao chegando.",
    5: "sexta-feira de entregas chegando. Foco total!",
    6: "sabado de equilibrio.",
  }

  return `${period}, Laura! Sobre seu ${dayMessages[day]}`
}

export function GreetingBanner() {
  const [greeting, setGreeting] = useState("Ola, Laura!")
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setGreeting(buildGreeting(new Date()))
  }, [])

  // Rotaciona os insights automaticamente quando o banner esta colapsado
  useEffect(() => {
    if (expanded) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % INSIGHTS.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [expanded])

  const insight = INSIGHTS[index]
  const isOpportunity = insight.type === "oportunidade"

  const assistantHref = useMemo(
    () => `/assistente?context=${encodeURIComponent(insight.contextSeed)}`,
    [insight.contextSeed],
  )

  function nextInsight() {
    setIndex((i) => (i + 1) % INSIGHTS.length)
  }

  return (
    <section
      aria-label="Insights da IA"
      className="overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-card"
    >
      {/* Cabecalho: sempre visivel */}
      <div className="flex items-start gap-3 p-4">
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-4" />
          <span className="absolute -right-0.5 -top-0.5 size-2 animate-pulse rounded-full bg-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="size-2.5" />
              Insight da IA
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              {isOpportunity ? (
                <Award className="size-3" />
              ) : (
                <Lightbulb className="size-3" />
              )}
              {isOpportunity ? "Oportunidade" : "Curiosidade"}
            </span>
          </div>

          <p className="mt-1.5 text-sm font-medium leading-snug text-pretty">
            {insight.headline}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{greeting}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
            onClick={nextInsight}
            aria-label="Proximo insight"
          >
            <RefreshCw className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-label={expanded ? "Recolher insight" : "Expandir insight"}
          >
            {expanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Conteudo expansivel */}
      {expanded && (
        <div className="border-t border-primary/15 px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {isOpportunity && insight.thumbnail && (
              <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg border border-border sm:h-24 sm:w-40">
                <Image
                  src={insight.thumbnail || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {insight.description}
              </p>
              {insight.meta && (
                <p className="mt-2 text-xs font-medium text-foreground/70">
                  {insight.meta}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {isOpportunity && insight.ctaLabel && insight.ctaHref && (
                  <Button asChild size="sm" className="gap-1.5">
                    <Link href={insight.ctaHref}>
                      {insight.ctaLabel}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                )}

                {/*
                  "Explorar com Assistente" roteia para a aba Assistente Academico
                  (/assistente) passando o contexto do insight selecionado via query
                  string (?context=...). O chat le esse parametro e inicia a conversa
                  ja com o assunto da oportunidade/curiosidade carregado.
                */}
                <Button
                  asChild
                  size="sm"
                  variant={isOpportunity ? "outline" : "default"}
                  className="gap-1.5"
                >
                  <Link href={assistantHref}>
                    <MessageSquare className="size-3.5" />
                    Explorar com Assistente
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
