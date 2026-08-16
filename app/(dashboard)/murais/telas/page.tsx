"use client"

import { useState, useMemo } from "react"
import { SearchX } from "lucide-react"

import { MuraisNav } from "@/components/murais/murais-nav"
import { ScreenCard } from "@/components/murais/screen-card"
import { AddScreenDialog } from "@/components/murais/add-screen-dialog"
import { TELAS, CENTROS, type ScreenStatus } from "@/components/murais/murais-data"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CENTRO_FILTROS = [
  { id: "todos", nome: "Todos" },
  ...CENTROS.map((c) => ({ id: c.id, nome: c.nome })),
]

const PREDIO_FILTROS = [
  "Todos",
  "Bloco A",
  "Bloco B",
  "Prédio Principal",
  "Edifício Principal",
  "Bloco Norte",
  "Anexo Administrativo",
  "Prédio Central",
  "Auditório Central",
]

const STATUS_FILTROS: { id: "todos" | ScreenStatus; nome: string }[] = [
  { id: "todos", nome: "Todos os status" },
  { id: "online", nome: "Online" },
  { id: "offline", nome: "Offline" },
  { id: "sincronizando", nome: "Sincronizando" },
]

export default function TelasPage() {
  const [busca, setBusca] = useState("")
  const [filtroCentro, setFiltroCentro] = useState("todos")
  const [filtroPredio, setFiltroPredio] = useState("Todos")
  const [filtroStatus, setFiltroStatus] = useState<"todos" | ScreenStatus>("todos")

  const telasFiltradas = useMemo(() => {
    return TELAS.filter((tela) => {
      const matchBusca =
        !busca.trim() ||
        tela.nome.toLowerCase().includes(busca.toLowerCase()) ||
        tela.ip.includes(busca)

      const matchCentro =
        filtroCentro === "todos" || tela.centro === filtroCentro

      const matchPredio =
        filtroPredio === "Todos" || tela.predio === filtroPredio

      const matchStatus =
        filtroStatus === "todos" || tela.status === filtroStatus

      return matchBusca && matchCentro && matchPredio && matchStatus
    })
  }, [busca, filtroCentro, filtroPredio, filtroStatus])

  const online = TELAS.filter((t) => t.status === "online").length
  const offline = TELAS.filter((t) => t.status === "offline").length
  const sync = TELAS.filter((t) => t.status === "sincronizando").length

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Gerenciamento de Telas
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Monitore o status dos dispositivos e gerencie os murais do campus.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              {online} online
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" />
              {sync} sincronizando
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-rose-500" />
              {offline} offline
            </span>
          </div>
        </div>
        <AddScreenDialog />
      </div>

      <MuraisNav />

      {/* Barra de filtros */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="filtro-busca" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Buscar
          </Label>
          <Input
            id="filtro-busca"
            placeholder="Buscar por nome da tela ou IP..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="sm:w-48">
          <Label htmlFor="filtro-centro" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Centro
          </Label>
          <Select value={filtroCentro} onValueChange={setFiltroCentro}>
            <SelectTrigger id="filtro-centro" className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CENTRO_FILTROS.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:w-44">
          <Label htmlFor="filtro-predio" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Prédio
          </Label>
          <Select value={filtroPredio} onValueChange={setFiltroPredio}>
            <SelectTrigger id="filtro-predio" className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PREDIO_FILTROS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:w-44">
          <Label htmlFor="filtro-status" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Status
          </Label>
          <Select
            value={filtroStatus}
            onValueChange={(v) => setFiltroStatus(v as "todos" | ScreenStatus)}
          >
            <SelectTrigger id="filtro-status" className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTROS.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid de telas */}
      {telasFiltradas.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {telasFiltradas.map((tela) => (
            <ScreenCard key={tela.id} tela={tela} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <SearchX className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Nenhuma tela encontrada com estes filtros
          </p>
          <button
            type="button"
            onClick={() => {
              setBusca("")
              setFiltroCentro("todos")
              setFiltroPredio("Todos")
              setFiltroStatus("todos")
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
