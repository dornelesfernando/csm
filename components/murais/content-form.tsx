"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { CloudUpload as UploadCloud, Calendar as CalendarIcon, Save, Send, Link as LinkIcon } from "lucide-react"
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
import { LocaisSelector } from "./locais-selector"
import {
  POST_TYPES,
  POST_TYPE_KEYS,
  type PostType,
} from "./playlist-data"

export function ContentForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [titulo, setTitulo] = useState("")
  const [resumo, setResumo] = useState("")
  const [link, setLink] = useState("")
  const [linkError, setLinkError] = useState("")
  const [range, setRange] = useState<DateRange | undefined>()
  const [tipo, setTipo] = useState<PostType>("noticia")
  const [locais, setLocais] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  function validateLink(value: string): boolean {
    if (!value) return true
    try {
      const url = new URL(value)
      return url.protocol === "http:" || url.protocol === "https:"
    } catch {
      return false
    }
  }

  function handleLinkChange(value: string) {
    setLink(value)
    if (value && !validateLink(value)) {
      setLinkError("Informe uma URL valida (https://...)")
    } else {
      setLinkError("")
    }
  }

  function handleFiles(files: FileList | null) {
    if (files && files.length > 0) {
      setFileName(files[0].name)
      toast.success("Arquivo anexado", { description: files[0].name })
    }
  }

  function handleSubmit(publicar: boolean) {
    if (!titulo.trim()) {
      toast.error("Informe o titulo da postagem.")
      return
    }
    if (!validateLink(link)) {
      toast.error("O link informado nao e uma URL valida.")
      return
    }
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
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="resumo">Resumo</Label>
                <Textarea
                  id="resumo"
                  placeholder="Escreva o texto que sera exibido no mural. Seja direto e objetivo para leitura a distancia."
                  className="min-h-36 resize-none"
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Recomendado ate 240 caracteres para boa leitura na TV.
                </p>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="link"
                  className="flex items-center gap-1.5"
                >
                  <LinkIcon className="size-3.5 text-muted-foreground" />
                  Link (opcional)
                </Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="https://exemplo.com.br/conteudo"
                  value={link}
                  onChange={(e) => handleLinkChange(e.target.value)}
                />
                {linkError ? (
                  <p className="text-xs text-destructive">{linkError}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    URL externa acessivel via QR Code no mural.
                  </p>
                )}
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
                    <p className="text-sm font-medium">{fileName}</p>
                  ) : (
                    <>
                      <div className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <UploadCloud className="size-5" />
                      </div>
                      <p className="text-sm font-medium">
                        Arraste uma imagem ou video aqui
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ou clique para procurar
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

        <div className="flex flex-col gap-6">
          <Card className="bg-card lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-base">
                Configuracoes de exibicao
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
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

              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de conteudo</Label>
                <Select
                  value={tipo}
                  onValueChange={(v) => setTipo(v as PostType)}
                >
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_TYPE_KEYS.map((k) => (
                      <SelectItem key={k} value={k}>
                        {POST_TYPES[k].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Locais de exibicao</Label>
                <LocaisSelector
                  selected={locais}
                  onChange={setLocais}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
