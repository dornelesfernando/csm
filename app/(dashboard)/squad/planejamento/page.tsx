"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Calendar,
  Users,
  Target,
  Clock,
} from "lucide-react"
import { NovoMilestoneDialog } from "@/components/forms/novo-milestone-dialog"

const sprints = [
  { id: "sprint-24", name: "Sprint 24 - Q1 2024" },
  { id: "sprint-25", name: "Sprint 25 - Q1 2024" },
  { id: "sprint-26", name: "Sprint 26 - Q2 2024" },
]

const milestones = [
  {
    id: "MS-001",
    name: "Lancamento MVP v2.0",
    startDate: "01 Jan",
    endDate: "15 Mar",
    progress: 85,
    status: "on-track",
    tasks: { done: 34, total: 40 },
    team: ["FD", "AS", "CM"],
  },
  {
    id: "MS-002",
    name: "Integracao API Parceiros",
    startDate: "01 Fev",
    endDate: "30 Abr",
    progress: 62,
    status: "on-track",
    tasks: { done: 18, total: 29 },
    team: ["PL", "JM"],
  },
  {
    id: "MS-003",
    name: "Refatoracao Modulo Auth",
    startDate: "15 Fev",
    endDate: "28 Fev",
    progress: 45,
    status: "at-risk",
    tasks: { done: 9, total: 20 },
    team: ["FD", "LC"],
  },
  {
    id: "MS-004",
    name: "Dashboard Analytics v3",
    startDate: "01 Mar",
    endDate: "15 Mai",
    progress: 20,
    status: "on-track",
    tasks: { done: 4, total: 20 },
    team: ["AS", "MR"],
  },
  {
    id: "MS-005",
    name: "Migracao Infraestrutura Cloud",
    startDate: "10 Jan",
    endDate: "20 Fev",
    progress: 30,
    status: "delayed",
    tasks: { done: 6, total: 20 },
    team: ["CM", "PL", "FD"],
  },
]

const teamCapacity = [
  { name: "Fernando Dorneles", initials: "FD", capacity: 90, hours: 36, maxHours: 40 },
  { name: "Ana Silva", initials: "AS", capacity: 75, hours: 30, maxHours: 40 },
  { name: "Carlos Mendes", initials: "CM", capacity: 85, hours: 34, maxHours: 40 },
  { name: "Patricia Lima", initials: "PL", capacity: 60, hours: 24, maxHours: 40 },
  { name: "Julia Martins", initials: "JM", capacity: 95, hours: 38, maxHours: 40 },
  { name: "Lucas Costa", initials: "LC", capacity: 50, hours: 20, maxHours: 40 },
]

const squadCapacity = [
  { name: "Squad Alpha", capacity: 78, members: 4 },
  { name: "Squad Beta", capacity: 65, members: 3 },
  { name: "Squad Core", capacity: 88, members: 5 },
]

function getStatusBorder(status: string) {
  switch (status) {
    case "on-track":
      return "border-l-emerald-500"
    case "at-risk":
      return "border-l-amber-500"
    case "delayed":
      return "border-l-red-500"
    default:
      return "border-l-blue-500"
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "on-track":
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">No prazo</Badge>
    case "at-risk":
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Em risco</Badge>
    case "delayed":
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Atrasado</Badge>
    default:
      return <Badge variant="secondary">Pendente</Badge>
  }
}

function getCapacityColor(capacity: number) {
  if (capacity >= 90) return "bg-red-500"
  if (capacity >= 75) return "bg-amber-500"
  return "bg-emerald-500"
}

export default function PlanejamentoPage() {
  const [selectedSprint, setSelectedSprint] = useState("sprint-24")

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Planejamento</h1>
            <p className="text-sm text-muted-foreground">
              Roadmap, Sprints e Capacity Planning
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedSprint} onValueChange={setSelectedSprint}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecionar Sprint" />
              </SelectTrigger>
              <SelectContent>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <NovoMilestoneDialog />
          </div>
        </div>

        {/* KPI Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100">
                <Target className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">5</p>
                <p className="text-xs text-muted-foreground">Milestones Ativos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100">
                <Calendar className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">3</p>
                <p className="text-xs text-muted-foreground">No Prazo</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">1</p>
                <p className="text-xs text-muted-foreground">Em Risco</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-red-100">
                <Users className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">1</p>
                <p className="text-xs text-muted-foreground">Atrasado</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Gantt-style Timeline */}
          <Card className="bg-card lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Roadmap de Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`rounded-lg border border-l-4 bg-muted/30 p-4 ${getStatusBorder(milestone.status)}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {milestone.id}
                        </span>
                        {getStatusBadge(milestone.status)}
                      </div>
                      <h3 className="font-medium">{milestone.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {milestone.startDate} - {milestone.endDate}
                      </p>
                    </div>
                    <div className="flex -space-x-2">
                      {milestone.team.map((initials) => (
                        <Avatar key={initials} className="size-7 border-2 border-background">
                          <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {milestone.tasks.done}/{milestone.tasks.total} tarefas
                      </span>
                      <span className="font-mono font-medium">{milestone.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full transition-all ${
                          milestone.status === "delayed"
                            ? "bg-red-500"
                            : milestone.status === "at-risk"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Capacity Planner */}
          <div className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Capacity - Equipe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamCapacity.map((member) => (
                  <div key={member.initials} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.name.split(" ")[0]}</span>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`text-xs font-mono font-medium ${
                            member.capacity >= 90 ? "text-red-600" :
                            member.capacity >= 75 ? "text-amber-600" : "text-emerald-600"
                          }`}>
                            {member.capacity}%
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{member.hours}h / {member.maxHours}h alocadas</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full transition-all ${getCapacityColor(member.capacity)}`}
                        style={{ width: `${member.capacity}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Capacity - Squads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {squadCapacity.map((squad) => (
                  <div key={squad.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{squad.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {squad.members} membros
                        </span>
                        <span className={`text-xs font-mono font-medium ${
                          squad.capacity >= 85 ? "text-red-600" :
                          squad.capacity >= 70 ? "text-amber-600" : "text-emerald-600"
                        }`}>
                          {squad.capacity}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full transition-all ${getCapacityColor(squad.capacity)}`}
                        style={{ width: `${squad.capacity}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
