"use client"

import { useState } from "react"
import { Play, Pause, Clock, Target, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RegistrarHorasSheet } from "@/components/forms/registrar-horas-sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activityLog = [
  { id: 1, task: "Refatorar modulo de auth", project: "Design System", hours: 2.5, date: "08/02/2026", nature: "Desenvolvimento", user: "FD" },
  { id: 2, task: "Code review PR #342", project: "Portal Admin", hours: 1.0, date: "08/02/2026", nature: "Revisao", user: "FD" },
  { id: 3, task: "Daily standup", project: "Geral", hours: 0.5, date: "08/02/2026", nature: "Reuniao", user: "FD" },
  { id: 4, task: "Implementar dashboard analytics", project: "Portal Admin", hours: 3.0, date: "07/02/2026", nature: "Desenvolvimento", user: "FD" },
  { id: 5, task: "Sprint planning", project: "Geral", hours: 1.5, date: "07/02/2026", nature: "Reuniao", user: "FD" },
  { id: 6, task: "Design da tela de onboarding", project: "App Mobile", hours: 2.0, date: "07/02/2026", nature: "Design", user: "FD" },
  { id: 7, task: "Corrigir bug pagamento", project: "E-commerce", hours: 1.5, date: "06/02/2026", nature: "Bug Fix", user: "FD" },
  { id: 8, task: "Documentar API", project: "Portal Admin", hours: 2.0, date: "06/02/2026", nature: "Documentacao", user: "FD" },
]

const natureColors: Record<string, string> = {
  Desenvolvimento: "bg-blue-500/10 text-blue-600",
  Revisao: "bg-violet-500/10 text-violet-600",
  Reuniao: "bg-amber-500/10 text-amber-600",
  Design: "bg-pink-500/10 text-pink-600",
  "Bug Fix": "bg-red-500/10 text-red-600",
  Documentacao: "bg-emerald-500/10 text-emerald-600",
}

export default function AtividadesPage() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerTask, setTimerTask] = useState("Refatorar modulo de auth")

  const todayHours = 4.0
  const dailyGoal = 8.0
  const weekHours = 32.5
  const weekGoal = 40.0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Atividades</h1>
          <p className="text-sm text-muted-foreground">Registre horas e acompanhe sua produtividade</p>
        </div>
        <RegistrarHorasSheet />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Horas Hoje</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayHours}h</div>
            <Progress value={(todayHours / dailyGoal) * 100} className="mt-2 h-2" />
            <p className="mt-1 text-xs text-muted-foreground">{todayHours}h de {dailyGoal}h ({Math.round((todayHours / dailyGoal) * 100)}%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Horas na Semana</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weekHours}h</div>
            <Progress value={(weekHours / weekGoal) * 100} className="mt-2 h-2" />
            <p className="mt-1 text-xs text-muted-foreground">{weekHours}h de {weekGoal}h ({Math.round((weekHours / weekGoal) * 100)}%)</p>
          </CardContent>
        </Card>

        <Card className={`${isTimerRunning ? "border-emerald-500/50" : ""}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Timer Ativo</CardTitle>
            <Target className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold font-mono">{isTimerRunning ? "01:23:45" : "00:00:00"}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">{timerTask}</p>
              </div>
              <Button
                size="icon"
                variant={isTimerRunning ? "destructive" : "default"}
                className="size-10 rounded-full"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registro de Atividades</CardTitle>
          <CardDescription>Historico de horas registradas</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarefa</TableHead>
                <TableHead className="hidden md:table-cell">Projeto</TableHead>
                <TableHead>Natureza</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead className="text-right">Horas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6 hidden md:flex">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{entry.user}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{entry.task}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="text-xs font-normal">{entry.project}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs border-0 ${natureColors[entry.nature] || ""}`}>{entry.nature}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{entry.date}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{entry.hours}h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
