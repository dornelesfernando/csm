"use client"

import { useState } from "react"
import {
  FolderOpen,
  Search,
  Calendar,
  Users,
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { NovoProjetoSheet } from "@/components/forms/novo-projeto-sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

type ProjectStatus = "active" | "on_hold" | "completed" | "planning"

interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number
  startDate: string
  endDate: string
  members: { initials: string }[]
  tasksCompleted: number
  tasksTotal: number
  hoursLogged: number
  hoursEstimated: number
  tags: string[]
}

const projects: Project[] = [
  {
    id: "PRJ-01", name: "Design System v2.0", description: "Reestruturacao completa do design system com novos componentes e tokens.", status: "active", progress: 68,
    startDate: "01/01/2026", endDate: "31/03/2026", members: [{ initials: "FD" }, { initials: "JM" }, { initials: "AL" }],
    tasksCompleted: 34, tasksTotal: 50, hoursLogged: 245, hoursEstimated: 360, tags: ["Design", "Frontend"],
  },
  {
    id: "PRJ-02", name: "Portal Admin Redesign", description: "Redesign do portal administrativo com foco em usabilidade e performance.", status: "active", progress: 42,
    startDate: "15/01/2026", endDate: "30/04/2026", members: [{ initials: "MS" }, { initials: "CR" }, { initials: "FD" }],
    tasksCompleted: 21, tasksTotal: 50, hoursLogged: 180, hoursEstimated: 420, tags: ["Frontend", "Backend"],
  },
  {
    id: "PRJ-03", name: "App Mobile - Fase 1", description: "Desenvolvimento do app mobile nativo para iOS e Android.", status: "planning", progress: 10,
    startDate: "01/03/2026", endDate: "30/06/2026", members: [{ initials: "AL" }, { initials: "JM" }],
    tasksCompleted: 5, tasksTotal: 48, hoursLogged: 32, hoursEstimated: 600, tags: ["Mobile", "Design"],
  },
  {
    id: "PRJ-04", name: "Migracaoo Infraestrutura Cloud", description: "Migrar toda infraestrutura on-premise para AWS com Kubernetes.", status: "active", progress: 85,
    startDate: "01/11/2025", endDate: "28/02/2026", members: [{ initials: "CR" }, { initials: "FD" }],
    tasksCompleted: 42, tasksTotal: 50, hoursLogged: 520, hoursEstimated: 600, tags: ["DevOps", "Backend"],
  },
  {
    id: "PRJ-05", name: "E-commerce v3", description: "Terceira versao da plataforma de e-commerce com checkout otimizado.", status: "on_hold", progress: 35,
    startDate: "01/12/2025", endDate: "31/05/2026", members: [{ initials: "MS" }, { initials: "AL" }, { initials: "CR" }],
    tasksCompleted: 14, tasksTotal: 40, hoursLogged: 120, hoursEstimated: 350, tags: ["Frontend", "Backend", "E-commerce"],
  },
  {
    id: "PRJ-06", name: "Sistema de Relatorios", description: "Novo modulo de relatorios com dashboards customizaveis.", status: "completed", progress: 100,
    startDate: "01/10/2025", endDate: "31/01/2026", members: [{ initials: "FD" }, { initials: "MS" }],
    tasksCompleted: 30, tasksTotal: 30, hoursLogged: 280, hoursEstimated: 300, tags: ["Frontend", "Data"],
  },
]

const statusConfig: Record<ProjectStatus, { label: string; color: string; dotColor: string }> = {
  active: { label: "Ativo", color: "bg-emerald-500/10 text-emerald-600", dotColor: "bg-emerald-500" },
  on_hold: { label: "Pausado", color: "bg-amber-500/10 text-amber-600", dotColor: "bg-amber-500" },
  completed: { label: "Concluido", color: "bg-blue-500/10 text-blue-600", dotColor: "bg-blue-500" },
  planning: { label: "Planejando", color: "bg-violet-500/10 text-violet-600", dotColor: "bg-violet-500" },
}

const tagColors: Record<string, string> = {
  Frontend: "bg-blue-500/10 text-blue-600",
  Backend: "bg-emerald-500/10 text-emerald-600",
  Design: "bg-pink-500/10 text-pink-600",
  DevOps: "bg-amber-500/10 text-amber-600",
  Mobile: "bg-violet-500/10 text-violet-600",
  "E-commerce": "bg-orange-500/10 text-orange-600",
  Data: "bg-cyan-500/10 text-cyan-600",
}

export default function ProjetosPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filtered = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount = projects.filter((p) => p.status === "active").length
  const totalHours = projects.reduce((acc, p) => acc + p.hoursLogged, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projetos</h1>
          <p className="text-sm text-muted-foreground">Visao geral e acompanhamento de projetos da squad</p>
        </div>
        <NovoProjetoSheet />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Projetos</CardTitle>
            <FolderOpen className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ativos</CardTitle>
            <TrendingUp className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Horas Investidas</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Concluidos</CardTitle>
            <CheckCircle2 className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p) => p.status === "completed").length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar projetos..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="on_hold">Pausado</SelectItem>
            <SelectItem value="completed">Concluido</SelectItem>
            <SelectItem value="planning">Planejando</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Card key={project.id} className="group transition-all hover:shadow-md hover:border-primary/30">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{project.id}</span>
                    <Badge variant="secondary" className={`text-[10px] border-0 ${statusConfig[project.status].color}`}>
                      {statusConfig[project.status].label}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><ArrowUpRight className="mr-2 size-4" />Abrir projeto</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Progresso</span>
                  <span className="text-xs font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 border-0 ${tagColors[tag] || ""}`}>{tag}</Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-md bg-muted/50 p-2">
                  <p className="text-xs text-muted-foreground">Tarefas</p>
                  <p className="text-sm font-semibold">{project.tasksCompleted}/{project.tasksTotal}</p>
                </div>
                <div className="rounded-md bg-muted/50 p-2">
                  <p className="text-xs text-muted-foreground">Horas</p>
                  <p className="text-sm font-semibold">{project.hoursLogged}h</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-1.5">
                  {project.members.map((m, i) => (
                    <Avatar key={i} className="size-6 border-2 border-card">
                      <AvatarFallback className="bg-primary/10 text-primary text-[9px]">{m.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  <span>{project.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
