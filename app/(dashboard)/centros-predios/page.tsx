"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Building2,
  ChevronDown,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Predio {
  id: string
  nome: string
  descricao: string
}

interface Centro {
  id: string
  nome: string
  sigla: string
  cor: string
  predios: Predio[]
}

const MOCK_CENTROS: Centro[] = [
  {
    id: "cct",
    nome: "Centro de Ciências Tecnológicas",
    sigla: "CCT",
    cor: "bg-blue-500",
    predios: [
      { id: "p1", nome: "Bloco A", descricao: "Salas de aula e coordenação — térreo e 1º andar" },
      { id: "p2", nome: "Bloco B", descricao: "Laboratórios de informática e redes — 2º andar" },
      { id: "p3", nome: "Prédio 7", descricao: "Centro de inovação e startup hub" },
      { id: "p4", nome: "Anexo I", descricao: "Auditório e salas de projeto" },
    ],
  },
  {
    id: "cch",
    nome: "Centro de Ciências Humanas",
    sigla: "CCH",
    cor: "bg-violet-500",
    predios: [
      { id: "p5", nome: "Bloco Norte", descricao: "Departamento de Filosofia e Sociologia" },
      { id: "p6", nome: "Bloco Sul", descricao: "Departamento de História e Geografia" },
      { id: "p7", nome: "Casa da Cultura", descricao: "Espaço de eventos e exposições" },
    ],
  },
  {
    id: "ccs",
    nome: "Centro de Ciências da Saúde",
    sigla: "CCS",
    cor: "bg-emerald-500",
    predios: [
      { id: "p8", nome: "Prédio Principal", descricao: "Salas de aula e laboratórios de enfermagem" },
      { id: "p9", nome: "Anexo Clínico", descricao: "Clínica-escola de atendimento à comunidade" },
      { id: "p10", nome: "Laboratório de Análises", descricao: "Labs de bioquímica e microbiologia" },
    ],
  },
  {
    id: "cca",
    nome: "Centro de Ciências Agrárias",
    sigla: "CCA",
    cor: "bg-amber-500",
    predios: [
      { id: "p11", nome: "Prédio Central", descricao: "Salas de aula e departamentos acadêmicos" },
      { id: "p12", nome: "Estação Experimental", descricao: "Campo de pesquisa e estufas" },
    ],
  },
  {
    id: "biblioteca",
    nome: "Biblioteca Central",
    sigla: "BC",
    cor: "bg-rose-500",
    predios: [
      { id: "p13", nome: "Edifício Principal", descricao: "Acervo geral e área de estudo — 3 andares" },
      { id: "p14", nome: "Anexo Periódicos", descricao: "Hemeroteca e salas de leitura silenciosa" },
    ],
  },
  {
    id: "reitoria",
    nome: "Reitoria e Administração",
    sigla: "RA",
    cor: "bg-cyan-500",
    predios: [
      { id: "p15", nome: "Prédio da Reitoria", descricao: "Gabinete da reitoria e pró-reitorias" },
      { id: "p16", nome: "Anexo Administrativo", descricao: "Setores de recursos humanos e finanças" },
      { id: "p17", nome: "Auditório Central", descricao: "Eventos institucionais e solenidades" },
    ],
  },
]

export default function CentrosPrediosPage() {
  const [centros, setCentros] = useState<Centro[]>(MOCK_CENTROS)

  // Centro dialog state
  const [centroDialogOpen, setCentroDialogOpen] = useState(false)
  const [editingCentro, setEditingCentro] = useState<Centro | null>(null)
  const [centroNome, setCentroNome] = useState("")
  const [centroSigla, setCentroSigla] = useState("")

  // Prédio dialog state
  const [predioDialogOpen, setPredioDialogOpen] = useState(false)
  const [predioCentroId, setPredioCentroId] = useState<string | null>(null)
  const [editingPredio, setEditingPredio] = useState<Predio | null>(null)
  const [predioNome, setPredioNome] = useState("")
  const [predioDescricao, setPredioDescricao] = useState("")

  // Delete state
  const [deleteCentro, setDeleteCentro] = useState<Centro | null>(null)
  const [deletePredio, setDeletePredio] = useState<{ centroId: string; predio: Predio } | null>(null)

  // --- Centro handlers ---
  function openCreateCentro() {
    setEditingCentro(null)
    setCentroNome("")
    setCentroSigla("")
    setCentroDialogOpen(true)
  }

  function openEditCentro(centro: Centro) {
    setEditingCentro(centro)
    setCentroNome(centro.nome)
    setCentroSigla(centro.sigla)
    setCentroDialogOpen(true)
  }

  function saveCentro(e: React.FormEvent) {
    e.preventDefault()
    if (!centroNome.trim() || !centroSigla.trim()) {
      toast.error("Preencha o nome e a sigla do centro.")
      return
    }
    if (editingCentro) {
      setCentros((prev) =>
        prev.map((c) =>
          c.id === editingCentro.id
            ? { ...c, nome: centroNome.trim(), sigla: centroSigla.trim().toUpperCase() }
            : c,
        ),
      )
      toast.success("Centro atualizado", {
        description: `${centroNome.trim()} foi atualizado com sucesso.`,
      })
    } else {
      const novo: Centro = {
        id: `centro-${Date.now()}`,
        nome: centroNome.trim(),
        sigla: centroSigla.trim().toUpperCase(),
        cor: "bg-slate-500",
        predios: [],
      }
      setCentros((prev) => [...prev, novo])
      toast.success("Centro criado", {
        description: `${novo.nome} foi adicionado.`,
      })
    }
    setCentroDialogOpen(false)
  }

  function confirmDeleteCentro() {
    if (!deleteCentro) return
    setCentros((prev) => prev.filter((c) => c.id !== deleteCentro.id))
    toast.success("Centro removido", {
      description: `${deleteCentro.nome} e seus prédios foram excluídos.`,
    })
    setDeleteCentro(null)
  }

  // --- Prédio handlers ---
  function openCreatePredio(centroId: string) {
    setPredioCentroId(centroId)
    setEditingPredio(null)
    setPredioNome("")
    setPredioDescricao("")
    setPredioDialogOpen(true)
  }

  function openEditPredio(centroId: string, predio: Predio) {
    setPredioCentroId(centroId)
    setEditingPredio(predio)
    setPredioNome(predio.nome)
    setPredioDescricao(predio.descricao)
    setPredioDialogOpen(true)
  }

  function savePredio(e: React.FormEvent) {
    e.preventDefault()
    if (!predioNome.trim()) {
      toast.error("Informe o nome do prédio.")
      return
    }
    if (!predioCentroId) return

    if (editingPredio) {
      setCentros((prev) =>
        prev.map((c) =>
          c.id === predioCentroId
            ? {
                ...c,
                predios: c.predios.map((p) =>
                  p.id === editingPredio.id
                    ? { ...p, nome: predioNome.trim(), descricao: predioDescricao.trim() }
                    : p,
                ),
              }
            : c,
        ),
      )
      toast.success("Prédio atualizado", {
        description: `${predioNome.trim()} foi atualizado.`,
      })
    } else {
      const novo: Predio = {
        id: `predio-${Date.now()}`,
        nome: predioNome.trim(),
        descricao: predioDescricao.trim(),
      }
      setCentros((prev) =>
        prev.map((c) =>
          c.id === predioCentroId ? { ...c, predios: [...c.predios, novo] } : c,
        ),
      )
      toast.success("Prédio adicionado", {
        description: `${novo.nome} foi vinculado ao centro.`,
      })
    }
    setPredioDialogOpen(false)
  }

  function confirmDeletePredio() {
    if (!deletePredio) return
    setCentros((prev) =>
      prev.map((c) =>
        c.id === deletePredio.centroId
          ? { ...c, predios: c.predios.filter((p) => p.id !== deletePredio.predio.id) }
          : c,
      ),
    )
    toast.success("Prédio removido", {
      description: `${deletePredio.predio.nome} foi excluído.`,
    })
    setDeletePredio(null)
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Centros e Prédios</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie os centros acadêmicos e os prédios vinculados a cada unidade.
          </p>
        </div>
        <Button onClick={openCreateCentro} className="gap-2">
          <Plus className="size-4" />
          Novo Centro
        </Button>
      </div>

      {/* Accordion de centros */}
      <Accordion type="multiple" className="space-y-3">
        {centros.map((centro) => (
          <AccordionItem
            key={centro.id}
            value={centro.id}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <AccordionTrigger className="hover:no-underline px-4 py-3 [&[data-state=open]]:border-b [&[data-state=open]]:border-border">
              <div className="flex flex-1 items-center gap-3 text-left">
                <Badge
                  variant="secondary"
                  className={cn("font-bold tracking-wide text-white", centro.cor)}
                >
                  {centro.sigla}
                </Badge>
                <span className="font-medium">{centro.nome}</span>
                <span className="text-sm text-muted-foreground">
                  {centro.predios.length}{" "}
                  {centro.predios.length === 1 ? "Prédio" : "Prédios"}
                </span>
              </div>

              {/* Ações do centro — stopPropagation para não acionar o accordion */}
              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => openEditCentro(centro)}
                >
                  <Pencil className="size-4" />
                  <span className="sr-only">Editar centro</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-red-600 hover:text-red-700"
                  onClick={() => setDeleteCentro(centro)}
                >
                  <Trash2 className="size-4" />
                  <span className="sr-only">Excluir centro</span>
                </Button>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4 pt-0">
              {/* Lista de prédios */}
              {centro.predios.length > 0 ? (
                <div className="divide-y divide-border">
                  {centro.predios.map((predio) => (
                    <div
                      key={predio.id}
                      className="flex items-center gap-3 py-3 first:pt-4 last:pb-4"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Building2 className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{predio.nome}</p>
                        {predio.descricao && (
                          <p className="truncate text-xs text-muted-foreground">
                            {predio.descricao}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => openEditPredio(centro.id, predio)}
                        >
                          <Pencil className="size-4" />
                          <span className="sr-only">Editar prédio</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-red-600 hover:text-red-700"
                          onClick={() =>
                            setDeletePredio({ centroId: centro.id, predio })
                          }
                        >
                          <Trash2 className="size-4" />
                          <span className="sr-only">Excluir prédio</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Nenhum prédio vinculado a este centro ainda.
                </p>
              )}

              <Separator className="my-3" />

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => openCreatePredio(centro.id)}
              >
                <Plus className="size-4" />
                Adicionar Prédio neste Centro
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Dialog — Novo/Editar Centro */}
      <Dialog open={centroDialogOpen} onOpenChange={setCentroDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={saveCentro}>
            <DialogHeader>
              <DialogTitle>
                {editingCentro ? "Editar Centro" : "Novo Centro"}
              </DialogTitle>
              <DialogDescription>
                {editingCentro
                  ? "Atualize as informações do centro acadêmico."
                  : "Cadastre um novo centro acadêmico no sistema."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="centro-nome">Nome do Centro</Label>
                <Input
                  id="centro-nome"
                  placeholder="Ex: Centro de Ciências Exatas"
                  value={centroNome}
                  onChange={(e) => setCentroNome(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="centro-sigla">Sigla</Label>
                <Input
                  id="centro-sigla"
                  placeholder="Ex: CCE"
                  maxLength={6}
                  value={centroSigla}
                  onChange={(e) => setCentroSigla(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog — Novo/Editar Prédio */}
      <Dialog open={predioDialogOpen} onOpenChange={setPredioDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={savePredio}>
            <DialogHeader>
              <DialogTitle>
                {editingPredio ? "Editar Prédio" : "Novo Prédio"}
              </DialogTitle>
              <DialogDescription>
                {editingPredio
                  ? "Atualize as informações do prédio."
                  : "Vincule um novo prédio ao centro selecionado."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="predio-nome">Nome do Prédio</Label>
                <Input
                  id="predio-nome"
                  placeholder="Ex: Bloco C"
                  value={predioNome}
                  onChange={(e) => setPredioNome(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="predio-desc">Descrição de Localização</Label>
                <Input
                  id="predio-desc"
                  placeholder="Ex: 2º andar — lado sul do campus"
                  value={predioDescricao}
                  onChange={(e) => setPredioDescricao(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog — Excluir Centro */}
      <AlertDialog
        open={!!deleteCentro}
        onOpenChange={(open) => !open && setDeleteCentro(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Excluir {deleteCentro?.nome}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá o centro e todos os {deleteCentro?.predios.length}{" "}
              prédios vinculados a ele. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteCentro}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir Centro
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* AlertDialog — Excluir Prédio */}
      <AlertDialog
        open={!!deletePredio}
        onOpenChange={(open) => !open && setDeletePredio(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Excluir {deletePredio?.predio.nome}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá o prédio do centro vinculado. Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletePredio}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir Prédio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
