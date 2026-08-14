"use client"

import { useState } from "react"
import { Mic, ImageIcon, Type, Sparkles, Send, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  type Memory,
  type MemoryFormat,
  type MemoryType,
  memoryTypes,
} from "./memory-data"

const formats: { value: MemoryFormat; label: string; icon: typeof Type }[] = [
  { value: "texto", label: "Texto", icon: Type },
  { value: "audio", label: "Audio", icon: Mic },
  { value: "imagem", label: "Imagem", icon: ImageIcon },
]

// Categorizacao automatica simulada por palavras-chave
function autoClassify(text: string): { type: MemoryType; tags: string[] } | null {
  if (text.trim().length < 12) return null
  const lower = text.toLowerCase()
  let type: MemoryType = "Aprendizado"
  if (/(nao entendi|duvida|como|por que|revisar)/.test(lower)) type = "Duvida"
  else if (/(percebi|me mostrou|refleti|senti|aprendi sobre mim)/.test(lower)) type = "Reflexao"
  else if (/(conectei|insight|finalmente|sacada|relacao entre)/.test(lower)) type = "Insight"
  else if (/(consegui|ganhei|aprovado|premio|apresentei|conclui)/.test(lower)) type = "Conquista"

  const knownTags: Record<string, string> = {
    react: "React",
    banco: "Banco de Dados",
    rede: "Redes Neurais",
    pesquisa: "Pesquisa",
    git: "Git",
    algoritmo: "Algoritmos",
    lideranca: "Lideranca",
    time: "Trabalho em Equipe",
    ia: "Inteligencia Artificial",
  }
  const tags = Object.entries(knownTags)
    .filter(([key]) => lower.includes(key))
    .map(([, label]) => label)
    .slice(0, 3)

  return { type, tags: tags.length ? tags : ["Geral"] }
}

interface QuickCaptureProps {
  onCreate: (memory: Memory) => void
}

export function QuickCapture({ onCreate }: QuickCaptureProps) {
  const [format, setFormat] = useState<MemoryFormat>("texto")
  const [text, setText] = useState("")
  const [recording, setRecording] = useState(false)

  const suggestion = autoClassify(text)

  function handleSubmit() {
    if (!text.trim()) return
    const classified = suggestion ?? { type: "Aprendizado" as MemoryType, tags: ["Geral"] }
    onCreate({
      id: `m-${Date.now()}`,
      type: classified.type,
      format,
      text: text.trim(),
      tags: classified.tags,
      date: "Agora",
      dayLabel: "Hoje",
      durationLabel: format === "audio" ? "0:32" : undefined,
    })
    setText("")
    setRecording(false)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      {/* Seletor de formato */}
      <div className="mb-3 flex items-center gap-1">
        {formats.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFormat(f.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              format === f.value
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <f.icon className="size-3.5" />
            {f.label}
          </button>
        ))}
      </div>

      {format === "audio" ? (
        <button
          type="button"
          onClick={() => setRecording((r) => !r)}
          className={cn(
            "flex w-full items-center justify-center gap-3 rounded-lg border border-dashed py-8 text-sm font-medium transition-colors",
            recording
              ? "border-rose-500/50 bg-rose-500/5 text-rose-600 dark:text-rose-400"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
          )}
        >
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-full",
              recording ? "bg-rose-500 text-white animate-pulse" : "bg-primary text-primary-foreground",
            )}
          >
            <Mic className="size-5" />
          </span>
          {recording ? "Gravando... toque para parar" : "Toque para gravar um audio rapido"}
        </button>
      ) : format === "imagem" ? (
        <div className="flex flex-col gap-3">
          <label className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-border py-8 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ImageIcon className="size-5" />
            </span>
            Adicionar uma imagem ou print
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Descreva o que essa imagem representa..."
            className="min-h-16 resize-none border-border bg-background"
          />
        </div>
      ) : (
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que voce aprendeu, percebeu ou conquistou hoje?"
          className="min-h-24 resize-none border-border bg-background text-sm leading-relaxed"
          autoFocus
        />
      )}

      {/* Sugestao automatica */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex min-h-7 flex-wrap items-center gap-1.5">
          {suggestion && format !== "audio" && (
            <>
              <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                <Sparkles className="size-3 text-primary" />
                Sugerido:
              </span>
              <Badge variant="secondary" className="gap-1 text-[10px]">
                {suggestion.type}
              </Badge>
              {suggestion.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  #{tag}
                </Badge>
              ))}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {text && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setText("")}
              className="h-8 px-2 text-muted-foreground"
            >
              <X className="size-4" />
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!text.trim() && format !== "audio"}
            className="h-8 gap-1.5"
          >
            <Send className="size-3.5" />
            Salvar memoria
          </Button>
        </div>
      </div>
    </div>
  )
}
