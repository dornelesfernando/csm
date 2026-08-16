"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, GripVertical, ChevronUp, Minus, ChevronDown, MessageSquare, Paperclip, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NovoCardDialog } from "@/components/forms/novo-card-dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type KanbanStatus = "backlog" | "todo" | "in_progress" | "review" | "done"
type Priority = "urgent" | "high" | "medium" | "low"

interface KanbanCard {
  id: string
  title: string
  priority: Priority
  assignees: { initials: string }[]
  tags: string[]
  comments: number
  attachments: number
  deadline?: string
}

const columns: { id: KanbanStatus; title: string; color: string; dotColor: string }[] = [
  { id: "backlog", title: "Backlog", color: "text-slate-500", dotColor: "bg-slate-400" },
  { id: "todo", title: "A Fazer", color: "text-blue-500", dotColor: "bg-blue-500" },
  { id: "in_progress", title: "Em Progresso", color: "text-amber-500", dotColor: "bg-amber-500" },
  { id: "review", title: "Em Revisao", color: "text-violet-500", dotColor: "bg-violet-500" },
  { id: "done", title: "Concluido", color: "text-emerald-500", dotColor: "bg-emerald-500" },
]

const initialCards: Record<KanbanStatus, KanbanCard[]> = {
  backlog: [
    { id: "K-101", title: "Pesquisar bibliotecas de graficos", priority: "low", assignees: [{ initials: "AL" }], tags: ["Research"], comments: 2, attachments: 0 },
    { id: "K-102", title: "Criar wireframes do relatorio", priority: "medium", assignees: [{ initials: "JM" }], tags: ["Design"], comments: 0, attachments: 1 },
    { id: "K-103", title: "Migrar testes para Vitest", priority: "low", assignees: [{ initials: "CR" }], tags: ["DevOps"], comments: 1, attachments: 0 },
  ],
  todo: [
    { id: "K-104", title: "Implementar filtros avancados", priority: "high", assignees: [{ initials: "FD" }], tags: ["Frontend"], comments: 4, attachments: 0, deadline: "12/02" },
    { id: "K-105", title: "Configurar monitoramento APM", priority: "medium", assignees: [{ initials: "CR" }], tags: ["DevOps"], comments: 1, attachments: 2 },
  ],
  in_progress: [
    { id: "K-106", title: "Refatorar modulo de autenticacao", priority: "high", assignees: [{ initials: "FD" }, { initials: "MS" }], tags: ["Backend", "Security"], comments: 8, attachments: 3, deadline: "15/02" },
    { id: "K-107", title: "Design system - Componentes de form", priority: "medium", assignees: [{ initials: "JM" }, { initials: "AL" }], tags: ["Design", "Frontend"], comments: 5, attachments: 1, deadline: "18/02" },
    { id: "K-108", title: "Otimizar queries de busca", priority: "urgent", assignees: [{ initials: "FD" }], tags: ["Backend"], comments: 3, attachments: 0, deadline: "10/02" },
  ],
  review: [
    { id: "K-109", title: "Implementar notificacoes push", priority: "medium", assignees: [{ initials: "AL" }], tags: ["Mobile"], comments: 6, attachments: 0 },
    { id: "K-110", title: "Corrigir bug no fluxo de pagamento", priority: "urgent", assignees: [{ initials: "CR" }], tags: ["Bug", "E-commerce"], comments: 10, attachments: 2 },
  ],
  done: [
    { id: "K-111", title: "Migrar banco para Postgres 16", priority: "high", assignees: [{ initials: "CR" }], tags: ["DevOps"], comments: 4, attachments: 1 },
    { id: "K-112", title: "Configurar pipeline CI/CD", priority: "medium", assignees: [{ initials: "FD" }], tags: ["DevOps"], comments: 2, attachments: 0 },
  ],
}

const priorityIcons: Record<Priority, React.ReactNode> = {
  urgent: <ChevronUp className="size-3.5 text-red-500" />,
  high: <ChevronUp className="size-3.5 text-orange-500" />,
  medium: <Minus className="size-3.5 text-blue-500" />,
  low: <ChevronDown className="size-3.5 text-slate-400" />,
}

const tagColors: Record<string, string> = {
  Frontend: "bg-blue-500/10 text-blue-600",
  Backend: "bg-emerald-500/10 text-emerald-600",
  Design: "bg-pink-500/10 text-pink-600",
  DevOps: "bg-amber-500/10 text-amber-600",
  Security: "bg-red-500/10 text-red-600",
  Mobile: "bg-violet-500/10 text-violet-600",
  Bug: "bg-red-500/10 text-red-600",
  Research: "bg-slate-500/10 text-slate-600",
  "E-commerce": "bg-emerald-500/10 text-emerald-600",
}

export default function KanbanPage() {
  const [cards] = useState(initialCards)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kanban Melhorias</h1>
          <p className="text-sm text-muted-foreground">Board de melhorias e features da squad</p>
        </div>
        <NovoCardDialog />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnCards = cards[column.id]
          return (
            <div key={column.id} className="flex w-72 shrink-0 flex-col">
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`size-2.5 rounded-full ${column.dotColor}`} />
                  <h2 className="text-sm font-semibold">{column.title}</h2>
                  <Badge variant="secondary" className="text-[10px] h-5 min-w-[20px] justify-center">{columnCards.length}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="size-6"><Plus className="size-3" /></Button>
              </div>

              {/* Cards */}
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-1">
                  {columnCards.map((card) => (
                    <Card key={card.id} className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            {priorityIcons[card.priority]}
                            <span className="font-mono text-[10px] text-muted-foreground">{card.id}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="size-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/tarefas/${card.id}`}><Eye className="mr-2 size-4" />Ver detalhes</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm font-medium mb-2 leading-snug">{card.title}</p>

                        {card.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2.5">
                            {card.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 border-0 ${tagColors[tag] || ""}`}>{tag}</Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-1.5">
                            {card.assignees.map((a, i) => (
                              <Avatar key={i} className="size-5 border-2 border-card">
                                <AvatarFallback className="bg-primary/10 text-primary text-[8px]">{a.initials}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            {card.deadline && <span className="text-[10px]">{card.deadline}</span>}
                            {card.comments > 0 && (
                              <div className="flex items-center gap-0.5">
                                <MessageSquare className="size-3" />
                                <span className="text-[10px]">{card.comments}</span>
                              </div>
                            )}
                            {card.attachments > 0 && (
                              <div className="flex items-center gap-0.5">
                                <Paperclip className="size-3" />
                                <span className="text-[10px]">{card.attachments}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )
        })}
      </div>
    </div>
  )
}
