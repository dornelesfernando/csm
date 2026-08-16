"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Play,
  Pause,
  MoreHorizontal,
  Eye,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { NovaTarefaDialog } from "@/components/forms/nova-tarefa-dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TaskStatus = "coding" | "ready" | "review" | "paused" | "done"
type TaskPriority = "urgent" | "high" | "medium" | "low"

interface Task {
  id: string
  title: string
  project: string
  status: TaskStatus
  priority: TaskPriority
  assignee: { name: string; initials: string }
  deadline: string
  hours: number
  isTimerActive: boolean
}

const tasks: Task[] = [
  { id: "T-5041", title: "Refatorar modulo de autenticacao", project: "Design System", status: "coding", priority: "high", assignee: { name: "Fernando D.", initials: "FD" }, deadline: "2026-02-15", hours: 12.5, isTimerActive: true },
  { id: "T-5042", title: "Implementar dashboard de analytics", project: "Portal Admin", status: "ready", priority: "medium", assignee: { name: "Maria S.", initials: "MS" }, deadline: "2026-02-18", hours: 8, isTimerActive: false },
  { id: "T-5043", title: "Corrigir bug no fluxo de pagamento", project: "E-commerce", status: "review", priority: "urgent", assignee: { name: "Carlos R.", initials: "CR" }, deadline: "2026-02-10", hours: 3, isTimerActive: false },
  { id: "T-5044", title: "Criar componentes de formulario", project: "Design System", status: "coding", priority: "medium", assignee: { name: "Ana L.", initials: "AL" }, deadline: "2026-02-20", hours: 6, isTimerActive: false },
  { id: "T-5045", title: "Configurar pipeline de CI/CD", project: "Infra", status: "paused", priority: "low", assignee: { name: "Fernando D.", initials: "FD" }, deadline: "2026-02-25", hours: 4.5, isTimerActive: false },
  { id: "T-5046", title: "Design da tela de onboarding", project: "App Mobile", status: "ready", priority: "high", assignee: { name: "Julia M.", initials: "JM" }, deadline: "2026-02-12", hours: 10, isTimerActive: false },
  { id: "T-5047", title: "Migrar banco de dados para Postgres 16", project: "Infra", status: "done", priority: "high", assignee: { name: "Carlos R.", initials: "CR" }, deadline: "2026-02-08", hours: 16, isTimerActive: false },
  { id: "T-5048", title: "Documentar API de integracoes", project: "Portal Admin", status: "coding", priority: "low", assignee: { name: "Maria S.", initials: "MS" }, deadline: "2026-03-01", hours: 2, isTimerActive: false },
  { id: "T-5049", title: "Implementar notificacoes push", project: "App Mobile", status: "review", priority: "medium", assignee: { name: "Ana L.", initials: "AL" }, deadline: "2026-02-14", hours: 7, isTimerActive: false },
  { id: "T-5050", title: "Otimizar queries de busca", project: "E-commerce", status: "coding", priority: "urgent", assignee: { name: "Fernando D.", initials: "FD" }, deadline: "2026-02-11", hours: 5, isTimerActive: true },
]

const statusConfig: Record<TaskStatus, { label: string; color: string; border: string }> = {
  coding: { label: "Codificando", color: "bg-blue-500/10 text-blue-600", border: "border-l-blue-500" },
  ready: { label: "Pronto", color: "bg-emerald-500/10 text-emerald-600", border: "border-l-emerald-500" },
  review: { label: "Em Revisao", color: "bg-amber-500/10 text-amber-600", border: "border-l-amber-500" },
  paused: { label: "Pausado", color: "bg-red-500/10 text-red-600", border: "border-l-red-500" },
  done: { label: "Concluido", color: "bg-slate-500/10 text-slate-600", border: "border-l-slate-400" },
}

const priorityConfig: Record<TaskPriority, { label: string; icon: React.ReactNode }> = {
  urgent: { label: "Urgente", icon: <ChevronUp className="size-4 text-red-500" /> },
  high: { label: "Alta", icon: <ChevronUp className="size-4 text-orange-500" /> },
  medium: { label: "Media", icon: <Minus className="size-4 text-blue-500" /> },
  low: { label: "Baixa", icon: <ChevronDown className="size-4 text-slate-400" /> },
}

export default function TarefasPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-sm text-muted-foreground">Gerencie e acompanhe todas as suas tarefas</p>
        </div>
        <NovaTarefaDialog />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por titulo ou ID..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="coding">Codificando</SelectItem>
            <SelectItem value="ready">Pronto</SelectItem>
            <SelectItem value="review">Em Revisao</SelectItem>
            <SelectItem value="paused">Pausado</SelectItem>
            <SelectItem value="done">Concluido</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="size-4" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Tarefa</TableHead>
                <TableHead className="hidden md:table-cell">Projeto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Prioridade</TableHead>
                <TableHead className="hidden lg:table-cell">Responsavel</TableHead>
                <TableHead className="hidden md:table-cell">Prazo</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Horas</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className={`border-l-4 ${statusConfig[task.status].border}`}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{task.id}</TableCell>
                  <TableCell>
                    <Link href={`/tarefas/${task.id}`} className="font-medium hover:underline">
                      {task.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="text-xs font-normal">{task.project}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs border-0 ${statusConfig[task.status].color}`}>
                      {statusConfig[task.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      {priorityConfig[task.priority].icon}
                      <span className="text-xs">{priorityConfig[task.priority].label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{task.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{task.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs">{task.deadline.split("-").reverse().join("/")}</TableCell>
                  <TableCell className="hidden lg:table-cell text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-xs font-mono">{task.hours}h</span>
                      <button type="button" className={`rounded p-0.5 ${task.isTimerActive ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}>
                        {task.isTimerActive ? <Pause className="size-3" /> : <Play className="size-3" />}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/tarefas/${task.id}`}>
                            <Eye className="mr-2 size-4" />
                            Ver detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
