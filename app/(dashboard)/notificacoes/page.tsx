"use client"

import React from "react"

import { useState } from "react"
import {
  Bell,
  Check,
  CheckCheck,
  MessageSquare,
  AlertTriangle,
  GitPullRequest,
  Clock,
  AtSign,
  Star,
  Trash2,
  Settings,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type NotificationType = "mention" | "comment" | "incident" | "task" | "review" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  from: { name: string; initials: string }
  time: string
  isRead: boolean
  link?: string
}

const notifications: Notification[] = [
  { id: "1", type: "incident", title: "Incidente critico aberto", description: "INC-301: API Gateway timeout em producao foi aberto e atribuido a voce.", from: { name: "Sistema", initials: "SY" }, time: "10 min atras", isRead: false, link: "/squad/incidentes" },
  { id: "2", type: "mention", title: "Mencionou voce em um comentario", description: "@fernando veja essa abordagem para o middleware de JWT, acho que podemos simplificar.", from: { name: "Maria S.", initials: "MS" }, time: "25 min atras", isRead: false, link: "/tarefas/T-5041" },
  { id: "3", type: "review", title: "Code review solicitado", description: "PR #342 - Implementar filtros avancados no modulo de busca precisa da sua revisao.", from: { name: "Ana L.", initials: "AL" }, time: "1h atras", isRead: false },
  { id: "4", type: "comment", title: "Novo comentario na tarefa", description: "Carlos R. comentou em T-5050: 'A query otimizada reduziu o tempo de resposta em 60%!'", from: { name: "Carlos R.", initials: "CR" }, time: "2h atras", isRead: false, link: "/tarefas/T-5050" },
  { id: "5", type: "task", title: "Tarefa atribuida a voce", description: "T-5055: Implementar notificacoes push no app mobile foi atribuida a voce.", from: { name: "Julia M.", initials: "JM" }, time: "3h atras", isRead: true },
  { id: "6", type: "system", title: "Sprint fechada com sucesso", description: "Sprint 24 foi concluida. 85% das tarefas foram entregues dentro do prazo. Parabens!", from: { name: "Sistema", initials: "SY" }, time: "5h atras", isRead: true },
  { id: "7", type: "mention", title: "Mencionou voce na ideia", description: "Julia M. mencionou voce em IDEA-39: 'Fernando, o que acha de usar pontos de XP?'", from: { name: "Julia M.", initials: "JM" }, time: "6h atras", isRead: true, link: "/squad/ideias" },
  { id: "8", type: "comment", title: "Novo comentario no projeto", description: "Maria S. comentou no PRJ-01: 'Os novos tokens de cor estao ficando otimos.'", from: { name: "Maria S.", initials: "MS" }, time: "8h atras", isRead: true, link: "/squad/projetos" },
  { id: "9", type: "review", title: "Sua PR foi aprovada", description: "PR #340 - Migrar banco para Postgres 16 foi aprovada por Carlos R. e ja pode ser mergeada.", from: { name: "Carlos R.", initials: "CR" }, time: "1 dia atras", isRead: true },
  { id: "10", type: "incident", title: "Incidente resolvido", description: "INC-297: Bug no upload de arquivos > 5MB foi resolvido com sucesso.", from: { name: "Sistema", initials: "SY" }, time: "2 dias atras", isRead: true, link: "/squad/incidentes" },
  { id: "11", type: "task", title: "Prazo se aproximando", description: "T-5043: Corrigir bug no fluxo de pagamento vence em 2 dias. Status atual: Em Revisao.", from: { name: "Sistema", initials: "SY" }, time: "2 dias atras", isRead: true, link: "/tarefas/T-5043" },
  { id: "12", type: "system", title: "Novo membro na squad", description: "Pedro H. foi adicionado ao time Engineering. De as boas-vindas!", from: { name: "Sistema", initials: "SY" }, time: "3 dias atras", isRead: true },
]

const typeConfig: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
  mention: { icon: <AtSign className="size-4" />, color: "text-blue-500 bg-blue-500/10" },
  comment: { icon: <MessageSquare className="size-4" />, color: "text-emerald-500 bg-emerald-500/10" },
  incident: { icon: <AlertTriangle className="size-4" />, color: "text-red-500 bg-red-500/10" },
  task: { icon: <Clock className="size-4" />, color: "text-amber-500 bg-amber-500/10" },
  review: { icon: <GitPullRequest className="size-4" />, color: "text-violet-500 bg-violet-500/10" },
  system: { icon: <Star className="size-4" />, color: "text-slate-500 bg-slate-500/10" },
}

export default function NotificacoesPage() {
  const [notifs, setNotifs] = useState(notifications)
  const [filter, setFilter] = useState<string>("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const unreadCount = notifs.filter((n) => !n.isRead).length

  const filtered = notifs.filter((n) => {
    if (filter === "unread") return !n.isRead
    if (filter === "read") return n.isRead
    return true
  })

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const markSelectedAsRead = () => {
    setNotifs((prev) =>
      prev.map((n) => (selectedIds.has(n.id) ? { ...n, isRead: true } : n)),
    )
    setSelectedIds(new Set())
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((n) => n.id)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notificacoes</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? `Voce tem ${unreadCount} notificacao${unreadCount > 1 ? "oes" : ""} nao lida${unreadCount > 1 ? "s" : ""}`
              : "Todas as notificacoes lidas"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="mr-2 size-4" />
            Marcar tudo como lido
          </Button>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href="/configuracoes"><Settings className="size-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Tabs value={filter} onValueChange={setFilter} className="flex-1">
          <TabsList>
            <TabsTrigger value="all" className="gap-1.5">
              Todas
              <Badge variant="secondary" className="ml-1 h-5 text-[10px]">{notifs.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-1.5">
              Nao Lidas
              {unreadCount > 0 && <Badge className="ml-1 h-5 text-[10px]">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="read">Lidas</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
          <span className="text-sm text-muted-foreground">{selectedIds.size} selecionada(s)</span>
          <Button variant="outline" size="sm" onClick={markSelectedAsRead}>
            <Check className="mr-2 size-3" />Marcar como lido
          </Button>
          <Button variant="outline" size="sm" className="text-destructive bg-transparent">
            <Trash2 className="mr-2 size-3" />Excluir
          </Button>
        </div>
      )}

      <Card>
        <CardContent className="p-0 divide-y">
          {/* Select All header */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-muted/30">
            <Checkbox
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-xs text-muted-foreground">
              {selectedIds.size === filtered.length && filtered.length > 0 ? "Desselecionar tudo" : "Selecionar tudo"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="size-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">Nenhuma notificacao encontrada</p>
              <p className="text-xs text-muted-foreground">Todas as suas notificacoes apareceraco aqui.</p>
            </div>
          ) : (
            filtered.map((notif) => {
              const config = typeConfig[notif.type]
              const Wrapper = notif.link ? Link : "div"
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/30 ${
                    !notif.isRead ? "bg-primary/[0.02]" : ""
                  }`}
                >
                  <Checkbox
                    checked={selectedIds.has(notif.id)}
                    onCheckedChange={() => toggleSelect(notif.id)}
                    className="mt-1"
                  />
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${config.color}`}>
                    {config.icon}
                  </div>
                  <Wrapper {...(notif.link ? { href: notif.link } : {})} className="flex-1 min-w-0 cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm leading-snug ${!notif.isRead ? "font-semibold" : "font-medium"}`}>
                            {notif.title}
                          </p>
                          {!notif.isRead && <div className="size-2 shrink-0 rounded-full bg-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.description}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{notif.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Avatar className="size-4">
                        <AvatarFallback className="bg-primary/10 text-primary text-[7px]">{notif.from.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] text-muted-foreground">{notif.from.name}</span>
                    </div>
                  </Wrapper>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
