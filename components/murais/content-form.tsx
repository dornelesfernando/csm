"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import {
  UploadCloud,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  X,
  FileImage,
  ImagePlus,
  Save,
  Send,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  CENTROS,
  CONTENT_TYPES,
  CONTENT_TYPE_KEYS,
  centroById,
} from "./murais-data"

export function ContentForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [range, setRange] = useState<DateRange | undefined>()
  const [locais, setLocais] = useState<string[]>([])
  const [locaisOpen, setLocaisOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  function toggleLocal(id: string) {
    setLocais((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function handleFiles(files: FileList | null) {
    if (files && files.length > 0) {
      setFileName(files[0].name)
      toast.success("Arquivo anexado", { description: files[0].name })
    }
  }

  function handleSubmit(publicar: boolean) {
    if (publicar) {
      toast.success("Conteudo publicado", {
        description: "A postagem ja esta na fila de exibicao das telas.",
      })
    } else {
      toast("Rascunho salvo", {
        description: "Voce pode continuar a edicao mais tarde.",
      })
    }
    router.push("/murais/conteudos")
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(true)
      }}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Coluna principal */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base">Conteudo da postagem</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Titulo</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Semana Academica de Computacao 2026"
                  className="text-base"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="resumo">Resumo</Label>
                <Textarea
                  id="resumo"
                  placeholder="Escreva o texto que sera exibido no mural. Seja direto e objetivo para leitura a distancia."
                  className="min-h-36 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Recomendado ate 240 caracteres para boa leitura na TV.
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Midia</Label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      fileInputRef.current?.click()
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    handleFiles(e.dataTransfer.files)
                  }}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                    dragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/40",
                  )}
                >
                  {fileName ? (
                    <>
                      <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FileImage className="size-5" />
                      </div>
                      <p className="text-sm font-medium">{fileName}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <ImagePlus className="size-3" />
                        Clique para trocar o arquivo
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <UploadCloud className="size-5" />
                      </div>
                      <p className="text-sm font-medium">
                        Arraste uma imagem ou video aqui
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ou clique para procurar &middot; PNG, JPG, MP4 ate 20MB
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral: configuracoes */}
        <div className="flex flex-col gap-6">
          <Card className="bg-card lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-base">Configuracoes de exibicao</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* Date range */}
              <div className="grid gap-2">
                <Label>Periodo de exibicao</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !range && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="size-4" />
                      {range?.from ? (
                        range.to ? (
                          <>
                            {format(range.from, "dd MMM", { locale: ptBR })} -{" "}
                            {format(range.to, "dd MMM yyyy", { locale: ptBR })}
                          </>
                        ) : (
                          format(range.from, "dd MMM yyyy", { locale: ptBR })
                        )
                      ) : (
                        <span>Selecione inicio e fim</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      numberOfMonths={1}
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Tipo */}
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de conteudo</Label>
                <Select defaultValue="noticia">
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPE_KEYS.map((k) => (
                      <SelectItem key={k} value={k}>
                        {CONTENT_TYPES[k].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Multi-select locais */}
              <div className="grid gap-2">
                <Label>Locais de exibicao</Label>
                <Popover open={locaisOpen} onOpenChange={setLocaisOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={locaisOpen}
                      className="justify-between font-normal"
                    >
                      <span className="truncate text-left">
                        {locais.length === 0
                          ? "Selecione os predios"
                          : `${locais.length} local(is) selecionado(s)`}
                      </span>
                      <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar predio..." />
                      <CommandList>
                        <CommandEmpty>Nenhum local encontrado.</CommandEmpty>
                        <CommandGroup>
                          {CENTROS.map((c) => {
                            const selected = locais.includes(c.id)
                            return (
                              <CommandItem
                                key={c.id}
                                value={c.nome}
                                onSelect={() => toggleLocal(c.id)}
                              >
                                <div
                                  className={cn(
                                    "flex size-4 items-center justify-center rounded border",
                                    selected
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-muted-foreground/40",
                                  )}
                                >
                                  {selected && <Check className="size-3" />}
                                </div>
                                <span className={cn("size-2 rounded-full", c.cor)} />
                                <span className="flex-1">{c.nome}</span>
                              </CommandItem>
                            )
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {locais.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {locais.map((id) => {
                      const c = centroById(id)
                      if (!c) return null
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 py-0.5 pl-1.5 pr-1 text-xs font-medium"
                        >
                          <span className={cn("size-2 rounded-full", c.cor)} />
                          {c.sigla}
                          <button
                            type="button"
                            onClick={() => toggleLocal(id)}
                            className="rounded p-0.5 hover:bg-muted"
                            aria-label={`Remover ${c.sigla}`}
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rodape de acoes */}
      <Separator />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit(false)}
        >
          <Save className="size-4" />
          Salvar Rascunho
        </Button>
        <Button type="submit">
          <Send className="size-4" />
          Publicar
        </Button>
      </div>
    </form>
  )
}
