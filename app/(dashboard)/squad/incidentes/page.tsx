"use client"

import React from "react"

import { useState } from "react"
import {
  AlertTriangle,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  ExternalLink,
  ShieldAlert,
  Flame,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReportarIncidenteDialog } from "@/components/forms/reportar-incidente-dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Severity = "critical" | "high" | "medium" | "low"
type IncidentStatus = "open" | "investigating" | "mitigated" | "resolved"

interface Incident {
  id: string
  title: string
  severity: Severity
  status: IncidentStatus
  assignee: { name: string; initials: string }
  service: string
  createdAt: string
  updatedAt: string
  description: string
}

const incidents: Incident[] = [
  { id: "INC-301", title: "API Gateway timeout em producao", severity: "critical", status: "investigating", assignee: { name: "Fernando D.", initials: "FD" }, service: "API Gateway", createdAt: "08/02 09:15", updatedAt: "08/02 10:42", description: "Timeouts intermitentes no gateway principal." },
  { id: "INC-300", title: "Falha no processamento de pagamentos", severity: "critical", status: "mitigated", assignee: { name: "Carlos R.", initials: "CR" }, service: "Pagamentos", createdAt: "07/02 14:30", updatedAt: "07/02 18:22", description: "Transacoes falhando com erro 500." },
  { id: "INC-299", title: "Lentidao no carregamento do dashboard", severity: "high", status: "open", assignee: { name: "Ana L.", initials: "AL" }, service: "Frontend", createdAt: "07/02 11:00", updatedAt: "07/02 11:00", description: "Dashboard demora mais de 8s para carregar." },
  { id: "INC-298", title: "Notificacoes por email nao enviadas", severity: "medium", status: "investigating", assignee: { name: "Maria S.", initials: "MS" }, service: "Notificacoes", createdAt: "06/02 16:45", updatedAt: "07/02 09:10", description: "Fila de emails parada desde ontem." },
  { id: "INC-297", title: "Bug no upload de arquivos > 5MB", severity: "medium", status: "resolved", assignee: { name: "Fernando D.", initials: "FD" }, service: "Storage", createdAt: "05/02 10:20", updatedAt: "06/02 14:30", description: "Uploads acima de 5MB retornam erro de timeout." },
  { id: "INC-296", title: "CSS quebrado na tela de login mobile", severity: "low", status: "resolved", assignee: { name: "Julia M.", initials: "JM" }, service: "Frontend", createdAt: "04/02 09:00", updatedAt: "04/02 15:45", description: "Layout descentralizado em telas < 375px." },
  { id: "INC-295", title: "Rate limiting muito agressivo na API", severity: "high", status: "mitigated", assignee: { name: "Carlos R.", initials: "CR" }, service: "API Gateway", createdAt: "03/02 13:10", updatedAt: "04/02 11:00", description: "Clientes reportando 429 com poucos requests." },
  { id: "INC-294", title: "Erro intermitente no SSO corporativo", severity: "high", status: "resolved", assignee: { name: "Fernando D.", initials: "FD" }, service: "Auth", createdAt: "02/02 08:30", updatedAt: "03/02 17:00", description: "Login SSO falha esporadicamente." },
]

const severityConfig: Record<Severity, { label: string; color: string; icon: React.ReactNode }> = {
  critical: { label: "Critico", color: "bg-red-500/10 text-red-600", icon: <Flame className="size-3.5 text-red-500" /> },
  high: { label: "Alto", color: "bg-orange-500/10 text-orange-600", icon: <Zap className="size-3.5 text-orange-500" /> },
  medium: { label: "Medio", color: "bg-amber-500/10 text-amber-600", icon: <AlertCircle className="size-3.5 text-amber-500" /> },
  low: { label: "Baixo", color: "bg-blue-500/10 text-blue-600", icon: <ShieldAlert className="size-3.5 text-blue-500" /> },
}

const statusConfig: Record<IncidentStatus, { label: string; color: string; icon: React.ReactNode; border: string }> = {
  open: { label: "Aberto", color: "bg-red-500/10 text-red-600", icon: <AlertTriangle className="size-3" />, border: "border-l-red-500" },
  investigating: { label: "Investigando", color: "bg-amber-500/10 text-amber-600", icon: <Clock className="size-3" />, border: "border-l-amber-500" },
  mitigated: { label: "Mitigado", color: "bg-blue-500/10 text-blue-600", icon: <AlertCircle className="size-3" />, border: "border-l-blue-500" },
  resolved: { label: "Resolvido", color: "bg-emerald-500/10 text-emerald-600", icon: <CheckCircle2 className="size-3" />, border: "border-l-emerald-500" },
}

export default function IncidentesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")

  const filtered = incidents.filter((inc) => {
    const matchesSearch = inc.title.toLowerCase().includes(search.toLowerCase()) || inc.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || inc.status === statusFilter
    const matchesSeverity = severityFilter === "all" || inc.severity === severityFilter
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const openCount = incidents.filter((i) => i.status === "open" || i.status === "investigating").length
  const criticalCount = incidents.filter((i) => i.severity === "critical" && i.status !== "resolved").length
  const mttr = "4h 32m"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Incidentes</h1>
          <p className="text-sm text-muted-foreground">Rastreamento e gestao de incidentes da squad</p>
        </div>
        <ReportarIncidenteDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Abertos</CardTitle>
            <AlertTriangle className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openCount}</div>
            <p className="text-xs text-muted-foreground">incidentes ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Criticos</CardTitle>
            <Flame className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">requerem atencao imediata</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MTTR</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mttr}</div>
            <p className="text-xs text-muted-foreground">tempo medio de resolucao</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolvidos (7d)</CardTitle>
            <CheckCircle2 className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">nos ultimos 7 dias</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por titulo ou ID..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="open">Aberto</SelectItem>
            <SelectItem value="investigating">Investigando</SelectItem>
            <SelectItem value="mitigated">Mitigado</SelectItem>
            <SelectItem value="resolved">Resolvido</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Severidade" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="critical">Critico</SelectItem>
            <SelectItem value="high">Alto</SelectItem>
            <SelectItem value="medium">Medio</SelectItem>
            <SelectItem value="low">Baixo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Incidente</TableHead>
                <TableHead>Severidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Servico</TableHead>
                <TableHead className="hidden lg:table-cell">Responsavel</TableHead>
                <TableHead className="hidden md:table-cell">Atualizado</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inc) => (
                <TableRow key={inc.id} className={`border-l-4 ${statusConfig[inc.status].border}`}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{inc.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{inc.title}</p>
                      <p className="text-xs text-muted-foreground hidden md:block">{inc.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs border-0 gap-1 ${severityConfig[inc.severity].color}`}>
                      {severityConfig[inc.severity].icon}
                      {severityConfig[inc.severity].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs border-0 gap-1 ${statusConfig[inc.status].color}`}>
                      {statusConfig[inc.status].icon}
                      {statusConfig[inc.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-xs font-normal">{inc.service}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6"><AvatarFallback className="bg-primary/10 text-primary text-[10px]">{inc.assignee.initials}</AvatarFallback></Avatar>
                      <span className="text-xs">{inc.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{inc.updatedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7"><MoreHorizontal className="size-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><ExternalLink className="mr-2 size-4" />Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Atualizar status</DropdownMenuItem>
                        <DropdownMenuItem>Reatribuir</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Fechar incidente</DropdownMenuItem>
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
