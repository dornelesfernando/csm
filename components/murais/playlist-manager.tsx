"use client"

import { useState, useMemo } from "react"
import { Search, Plus, GripVertical, ChevronUp, ChevronDown, Trash2, Save, Clock, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, Film, Image as ImageIcon, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ACERVO_MOCK,
  PLAYLIST_LOCATIONS,
  MEDIA_TYPES,
  type ContentItem,
  type PlaylistItem,
  type MediaType,
} from "./playlist-data"

const DEFAULT_SEGUNDOS = 10

const typeIcon: Record<MediaType, typeof ImageIcon> = {
  imagem: ImageIcon,
  video: Film,
  link: LinkIcon,
}

export function PlaylistManager() {
  const [acervo, setAcervo] = useState<ContentItem[]>(ACERVO_MOCK)
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([])
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState(PLAYLIST_LOCATIONS[0].id)

  const filteredAcervo = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return acervo
    return acervo.filter((item) => item.titulo.toLowerCase().includes(q))
  }, [acervo, query])

  const manualTotal = useMemo(
    () =>
      playlist.reduce(
        (sum, item) =>
          sum + (item.tipo === "video" ? item.duracaoReal : item.segundos),
        0,
      ),
    [playlist],
  )

  const realTotal = useMemo(
    () => playlist.reduce((sum, item) => sum + item.duracaoReal, 0),
    [playlist],
  )

  const diff = manualTotal - realTotal

  function addToPlaylist(item: ContentItem) {
    setAcervo((prev) => prev.filter((i) => i.id !== item.id))
    setPlaylist((prev) => [...prev, { ...item, segundos: DEFAULT_SEGUNDOS }])
  }

  function removeFromPlaylist(item: PlaylistItem) {
    setPlaylist((prev) => prev.filter((i) => i.id !== item.id))
    const { segundos: _segundos, ...rest } = item
    setAcervo((prev) => [...prev, rest])
  }

  function moveUp(index: number) {
    if (index === 0) return
    setPlaylist((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  function moveDown(index: number) {
    setPlaylist((prev) => {
      if (index >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  function updateSegundos(id: string, value: number) {
    setPlaylist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, segundos: Math.max(1, value) } : item,
      ),
    )
  }

  function handleSave() {
    if (playlist.length === 0) {
      toast.error("A playlist esta vazia", {
        description: "Adicione conteudos do acervo antes de salvar.",
      })
      return
    }
    const loc = PLAYLIST_LOCATIONS.find((l) => l.id === location)
    toast.success("Sequencia salva", {
      description: `${playlist.length} itens definidos para ${loc?.label ?? "o local selecionado"}. Ciclo de ${manualTotal}s.`,
    })
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header Bar */}
      <header className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight">
            Sequencia de Exibicao
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Visualizando playlist de:
          </span>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PLAYLIST_LOCATIONS.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} className="sm:ml-auto">
          <Save className="size-4" />
          Salvar Sequencia
        </Button>
      </header>

      {/* Split View */}
      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
        {/* Left Column — Acervo */}
        <div className="flex flex-col border-b border-border lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="border-b border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground">
                Acervo de Conteudos
              </h2>
              <Badge variant="secondary" className="text-xs">
                {filteredAcervo.length} disponiveis
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por titulo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-2 p-4">
              {filteredAcervo.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
                  <Search className="size-6 opacity-40" />
                  <p className="text-sm">
                    {query
                      ? "Nenhum conteudo encontrado."
                      : "Todo o acervo ja esta na playlist."}
                  </p>
                </div>
              )}
              {filteredAcervo.map((item) => {
                const Icon = typeIcon[item.tipo]
                const media = MEDIA_TYPES[item.tipo]
                return (
                  <Card
                    key={item.id}
                    className="group flex items-center gap-3 p-3 transition-colors hover:bg-muted/40"
                  >
                    <div
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-white",
                        item.thumb,
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.titulo}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "gap-1 text-[10px] font-normal",
                            media.badgeClass,
                          )}
                        >
                          <Icon className="size-3" />
                          {media.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.duracaoReal}s real
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addToPlaylist(item)}
                      className="shrink-0"
                    >
                      <Plus className="size-4" />
                      <span className="hidden sm:inline">Adicionar</span>
                    </Button>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column — Playlist Ativa */}
        <div className="flex flex-col lg:col-span-7">
          {/* Cycle Time Summary */}
          <div className="border-b border-border p-4">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-muted-foreground">
                Tempo total do ciclo
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">
                  Tempo configurado
                </span>
                <span className="text-2xl font-bold tabular-nums">
                  {manualTotal}s
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="hidden h-10 sm:block"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">
                  Duracao real
                </span>
                <span className="text-2xl font-semibold tabular-nums text-muted-foreground">
                  {realTotal}s
                </span>
              </div>
              <div className="sm:ml-auto">
                {playlist.length === 0 ? (
                  <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                    <Clock className="size-3.5" />
                    Sem itens
                  </Badge>
                ) : diff === 0 ? (
                  <Badge className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    Sincronizado
                  </Badge>
                ) : diff > 0 ? (
                  <Badge className="gap-1.5 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="size-3.5" />
                    +{diff}s acima da duracao real
                  </Badge>
                ) : (
                  <Badge className="gap-1.5 border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="size-3.5" />
                    {Math.abs(diff)}s abaixo da duracao real
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Playlist Items */}
          <ScrollArea className="flex-1">
            <div className="space-y-2 p-4">
              {playlist.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <Plus className="size-6 opacity-50" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Playlist vazia</p>
                    <p className="text-xs">
                      Adicione conteudos do acervo para comecar.
                    </p>
                  </div>
                </div>
              )}
              {playlist.map((item, index) => {
                const Icon = typeIcon[item.tipo]
                const media = MEDIA_TYPES[item.tipo]
                return (
                  <Card
                    key={item.id}
                    className="flex items-center gap-3 p-3"
                  >
                    <GripVertical
                      className="size-5 shrink-0 cursor-grab text-muted-foreground/50"
                      aria-hidden
                    />

                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-white",
                        item.thumb,
                      )}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.titulo}
                      </p>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "mt-0.5 gap-1 text-[10px] font-normal",
                          media.badgeClass,
                        )}
                      >
                        <Icon className="size-3" />
                        {media.label}
                      </Badge>
                    </div>

                    {/* Duration field */}
                    {item.tipo === "video" ? (
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Badge
                          variant="outline"
                          className="gap-1 border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        >
                          <Film className="size-3" />
                          Duracao do video
                        </Badge>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {item.duracaoReal}s
                        </span>
                      </div>
                    ) : (
                      <div className="flex shrink-0 flex-col items-end gap-0.5">
                        <label
                          htmlFor={`seg-${item.id}`}
                          className="text-[10px] text-muted-foreground"
                        >
                          Segundos
                        </label>
                        <Input
                          id={`seg-${item.id}`}
                          type="number"
                          min={1}
                          value={item.segundos}
                          onChange={(e) =>
                            updateSegundos(
                              item.id,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="h-8 w-20 tabular-nums"
                        />
                      </div>
                    )}

                    {/* Reorder buttons */}
                    <div className="flex shrink-0 flex-col gap-0.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                      >
                        <ChevronUp className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7"
                        onClick={() => moveDown(index)}
                        disabled={index === playlist.length - 1}
                      >
                        <ChevronDown className="size-4" />
                      </Button>
                    </div>

                    <Separator
                      orientation="vertical"
                      className="h-10 shrink-0"
                    />

                    {/* Delete button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeFromPlaylist(item)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
