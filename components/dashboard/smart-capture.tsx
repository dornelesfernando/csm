"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, BookMarked, Clock, TrendingUp, ArrowUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const placeholders = [
  "O que voce fez hoje? Como foi seu dia?",
  "O que pretende estudar nas proximas horas?",
  "Registrou alguma conquista ou aprendizado hoje?",
  "Quantas horas dedicou ao Projeto Atlas?",
  "Como posso ajudar na sua trajetoria academica?",
]

// Destinos para onde a IA pode rotear o texto capturado.
const routes = [
  { icon: Clock, label: "Registrar horas no projeto", color: "text-emerald-500" },
  { icon: BookMarked, label: "Adicionar a Memoria Academica", color: "text-blue-500" },
  { icon: TrendingUp, label: "Atualizar Competencias", color: "text-amber-500" },
]

export function SmartCapture() {
  const [text, setText] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Placeholder rotativo: troca a cada 3.5s enquanto o campo esta vazio e sem foco.
  useEffect(() => {
    if (text || focused) return
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [text, focused])

  const hasText = text.trim().length > 0

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-4 md:p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold leading-tight">
              Captura inteligente
            </h2>
            <p className="text-xs text-muted-foreground">
              Escreva livremente. A IA organiza e envia para o lugar certo.
            </p>
          </div>
        </div>

        <div
          className={`rounded-lg border bg-card transition-all ${
            focused
              ? "border-primary ring-2 ring-primary/20"
              : "border-border"
          }`}
        >
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholders[placeholderIndex]}
            className="min-h-24 resize-none border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between gap-2 border-t border-border/60 px-3 py-2">
            <p className="hidden text-xs text-muted-foreground sm:block">
              {hasText
                ? "Pronto para processar"
                : "Texto, ideias, reflexoes ou horas de estudo"}
            </p>
            <Button
              size="sm"
              disabled={!hasText}
              className="ml-auto gap-1.5"
            >
              <Sparkles className="size-4" />
              Processar com IA
              <ArrowUp className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            A IA pode enviar para:
          </span>
          {routes.map((route) => (
            <span
              key={route.label}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <route.icon className={`size-3.5 ${route.color}`} />
              {route.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
