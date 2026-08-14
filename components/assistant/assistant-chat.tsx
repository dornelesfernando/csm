"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Bot, ArrowUp, GraduationCap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  generateReply,
  SUGGESTED_PROMPTS,
  STUDENT_CONTEXT,
  CATEGORY_COLORS,
  type ChatMessage,
} from "./assistant-data"

function Citations({ citations }: { citations: NonNullable<ChatMessage["citations"]> }) {
  return (
    <div className="mt-3 flex flex-col gap-1.5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Baseado em
      </p>
      <div className="flex flex-wrap gap-1.5">
        {citations.map((c) => (
          <span
            key={c.label}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
              CATEGORY_COLORS[c.category] ?? "bg-muted text-muted-foreground"
            }`}
          >
            <Sparkles className="size-3" />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const seededRef = useRef(false)

  const hasStarted = messages.length > 0

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isThinking])

  function send(query: string) {
    const text = query.trim()
    if (!text || isThinking) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsThinking(true)

    setTimeout(() => {
      const reply = generateReply(text)
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: reply.text,
          citations: reply.citations,
        },
      ])
      setIsThinking(false)
    }, 900)
  }

  // Inicia a conversa automaticamente quando o usuario chega vindo do
  // Smart Insight Banner com um contexto (/assistente?context=...).
  useEffect(() => {
    if (seededRef.current) return
    const context = searchParams.get("context")
    if (context) {
      seededRef.current = true
      send(context)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col rounded-xl border border-border bg-card">
      {/* Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        {!hasStarted ? (
          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bot className="size-7" />
            </div>
            <h2 className="mt-4 text-balance text-xl font-semibold">
              Ola, {STUDENT_CONTEXT.name}. Sou seu copiloto academico.
            </h2>
            <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Conheco suas atividades, competencias, objetivos e linha do tempo. Pergunte sobre sua
              trajetoria e eu te ajudo a enxergar o que voce ja construiu e para onde pode ir.
            </p>

            <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p.query}
                  type="button"
                  onClick={() => send(p.query)}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3 text-left transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <GraduationCap className="size-3.5" />
                  </span>
                  <span className="text-sm font-medium leading-snug">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg) =>
              msg.role === "user" ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-4 py-3">
                    <p className="text-pretty text-sm leading-relaxed">{msg.text}</p>
                    {msg.citations && msg.citations.length > 0 && (
                      <Citations citations={msg.citations} />
                    )}
                  </div>
                </div>
              )
            )}

            {isThinking && (
              <div className="flex gap-3">
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-4 py-4">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sugestoes rapidas quando ja iniciou */}
      {hasStarted && (
        <div className="border-t border-border px-4 pt-3">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
            {SUGGESTED_PROMPTS.slice(0, 4).map((p) => (
              <button
                key={p.query}
                type="button"
                onClick={() => send(p.query)}
                disabled={isThinking}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-border p-4">
        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-xl border border-border bg-background p-2 focus-within:ring-2 focus-within:ring-ring">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre sua trajetoria academica..."
            rows={1}
            className="max-h-32 min-h-[40px] resize-none border-0 bg-transparent px-2 py-2 text-sm shadow-none focus-visible:ring-0"
          />
          <Button type="submit" size="icon" className="size-9 shrink-0" disabled={!input.trim() || isThinking}>
            <ArrowUp className="size-4" />
            <span className="sr-only">Enviar</span>
          </Button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
          O assistente responde com base nos seus registros. Versao de validacao (V0.5).
        </p>
      </form>
    </div>
  )
}
