"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, Plus, MoveHorizontal as MoreHorizontal, Pencil, Eye, Trash2, Copy, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
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
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CONTEUDOS,
  CONTENT_TYPES,
  CONTENT_STATUS,
  CONTENT_TYPE_KEYS,
  CONTENT_STATUS_KEYS,
  type ContentStatus,
  type ContentType,
} from "./murais-data"
import { TypeBadge, StatusBadge, TargetBadges } from "./content-badges"
import { ContentViewSheet } from "./content-view-sheet"
import type { Conteudo } from "./murais-data"

const PAGE_SIZE = 6

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function ContentTable() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "todos">("todos")
  const [typeFilter, setTypeFilter] = useState<ContentType | "todos">("todos")
  const [page, setPage] = useState(1)
  const [viewConteudo, setViewConteudo] = useState<Conteudo | null>(null)
  const [viewOpen, setViewOpen] = useState(false)

  const filtered = useMemo(() => {
    return CONTEUDOS.filter((c) => {
      const matchQuery = c.titulo.toLowerCase().includes(query.toLowerCase())
      const matchStatus = statusFilter === "todos" || c.status === statusFilter
      const matchType = typeFilter === "todos" || c.tipo === typeFilter
      return matchQuery && matchStatus && matchType
    })
  }, [query, statusFilter, typeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  function resetPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v)
      setPage(1)
    }
  }

  return (
    <>
    <Card className="bg-card">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por titulo..."
            value={query}
            onChange={(e) => resetPage(setQuery)(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={resetPage((v) => setStatusFilter(v as ContentStatus | "todos"))}
          >
            <SelectTrigger className="w-[150px]">
              <span className="truncate">
                {statusFilter === "todos"
                  ? "Todos os status"
                  : CONTENT_STATUS[statusFilter].label}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              {CONTENT_STATUS_KEYS.map((k) => (
                <SelectItem key={k} value={k}>
                  {CONTENT_STATUS[k].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={resetPage((v) => setTypeFilter(v as ContentType | "todos"))}
          >
            <SelectTrigger className="w-[150px]">
              <span className="truncate">
                {typeFilter === "todos"
                  ? "Todos os tipos"
                  : CONTENT_TYPES[typeFilter].label}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              {CONTENT_TYPE_KEYS.map((k) => (
                <SelectItem key={k} value={k}>
                  {CONTENT_TYPES[k].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button asChild>
            <Link href="/murais/conteudos/novo">
              <Plus className="size-4" />
              Novo Conteudo
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-[280px]">Titulo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Alvo</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10 text-right">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileText className="size-6" />
                    <p className="text-sm">Nenhum conteudo encontrado.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {pageItems.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`hidden size-11 shrink-0 rounded-md bg-gradient-to-br sm:block ${c.thumb}`}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{c.titulo}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.autor}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <TypeBadge type={c.tipo} />
                </TableCell>
                <TableCell>
                  <TargetBadges alvo={c.alvo} />
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{formatDate(c.inicio)}</p>
                    <p className="text-xs text-muted-foreground">
                      ate {formatDate(c.fim)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={c.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Abrir menu de acoes</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>Acoes</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Pencil className="size-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setViewConteudo(c)
                          setViewOpen(true)
                        }}
                      >
                        <Eye className="size-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          toast.success("Link copiado para a area de transferencia")
                        }
                      >
                        <Copy className="size-4" />
                        Copiar link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() =>
                          toast.error("Conteudo excluido", {
                            description: c.titulo,
                          })
                        }
                      >
                        <Trash2 className="size-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / paginacao */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Mostrando{" "}
          <span className="font-medium text-foreground">{pageItems.length}</span>{" "}
          de{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          conteudos
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="size-4" />
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Pagina {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Proxima
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </Card>

      <ContentViewSheet
        conteudo={viewConteudo}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />
    </>
  )
}
