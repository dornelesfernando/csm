"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, Plus, MoveHorizontal as MoreHorizontal, Pencil, Eye, Trash2, Copy, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { ContentEditDialog } from "./content-edit-dialog"
import { LocaisBadges } from "./locais-selector"
import {
  POST_CONTEUDOS,
  POST_TYPES,
  POST_STATUS,
  POST_TYPE_KEYS,
  POST_STATUS_KEYS,
  type PostConteudo,
  type PostType,
  type PostStatus,
} from "./playlist-data"

const PAGE_SIZE = 6

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const statusClassName: Record<PostStatus, string> = {
  ativo:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rascunho:
    "border-muted-foreground/30 bg-muted text-muted-foreground",
  agendado:
    "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  expirado:
    "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
}

export function ContentTable() {
  const [conteudos, setConteudos] = useState<PostConteudo[]>(POST_CONTEUDOS)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<PostStatus | "todos">(
    "todos",
  )
  const [typeFilter, setTypeFilter] = useState<PostType | "todos">("todos")
  const [page, setPage] = useState(1)
  const [viewConteudo, setViewConteudo] = useState<PostConteudo | null>(null)
  const [viewOpen, setViewOpen] = useState(false)

  const filtered = useMemo(() => {
    return conteudos.filter((c) => {
      const matchQuery = c.titulo.toLowerCase().includes(query.toLowerCase())
      const matchStatus = statusFilter === "todos" || c.status === statusFilter
      const matchType = typeFilter === "todos" || c.tipo === typeFilter
      return matchQuery && matchStatus && matchType
    })
  }, [conteudos, query, statusFilter, typeFilter])

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

  function handleSave(updated: PostConteudo) {
    setConteudos((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c)),
    )
    setViewConteudo(updated)
  }

  function handleView(c: PostConteudo) {
    setViewConteudo(c)
    setViewOpen(true)
  }

  function handleDelete(c: PostConteudo) {
    setConteudos((prev) => prev.filter((item) => item.id !== c.id))
    toast.success("Conteudo excluido", { description: c.titulo })
  }

  return (
    <>
      <Card className="bg-card">
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
              onValueChange={resetPage(
                (v) => setStatusFilter(v as PostStatus | "todos"),
              )}
            >
              <SelectTrigger className="w-[150px]">
                <span className="truncate">
                  {statusFilter === "todos"
                    ? "Todos os status"
                    : POST_STATUS[statusFilter].label}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                {POST_STATUS_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>
                    {POST_STATUS[k].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={typeFilter}
              onValueChange={resetPage(
                (v) => setTypeFilter(v as PostType | "todos"),
              )}
            >
              <SelectTrigger className="w-[150px]">
                <span className="truncate">
                  {typeFilter === "todos"
                    ? "Todos os tipos"
                    : POST_TYPES[typeFilter].label}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                {POST_TYPE_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>
                    {POST_TYPES[k].label}
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-[280px]">Titulo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Locais</TableHead>
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
                    <Badge variant="secondary" className="text-xs font-normal">
                      {POST_TYPES[c.tipo].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <LocaisBadges selected={c.locais} />
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
                    <Badge
                      variant="outline"
                      className={`gap-1.5 font-medium ${statusClassName[c.status]}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {POST_STATUS[c.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                        >
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Abrir menu de acoes</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel>Acoes</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(c)}>
                          <Eye className="size-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleView(c)}>
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toast.success(
                              "Link copiado para a area de transferencia",
                            )
                          }
                        >
                          <Copy className="size-4" />
                          Copiar link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(c)}
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

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium text-foreground">
              {pageItems.length}
            </span>{" "}
            de{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
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

      <ContentEditDialog
        conteudo={viewConteudo}
        open={viewOpen}
        onOpenChange={setViewOpen}
        onSave={handleSave}
      />
    </>
  )
}
