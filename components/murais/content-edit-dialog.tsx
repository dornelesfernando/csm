"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon, Link as LinkIcon, Pencil, Save, X, User } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { LocaisSelector, LocaisBadges } from "./locais-selector"
import {
  POST_TYPES,
  POST_STATUS,
  POST_TYPE_KEYS,
  POST_STATUS_KEYS,
  type PostConteudo,
  type PostType,
  type PostStatus,
} from "./playlist-data"

const editSchema = z.object({
  titulo: z.string().min(3, "Titulo deve ter no minimo 3 caracteres"),
  resumo: z.string().min(10, "Resumo deve ter no minimo 10 caracteres"),
  link: z
    .string()
    .refine(
      (val) => {
        if (!val) return true
        try {
          const url = new URL(val)
          return url.protocol === "http:" || url.protocol === "https:"
        } catch {
          return false
        }
      },
      { message: "Informe uma URL valida (https://...)" },
    ),
  tipo: z.string(),
  status: z.string(),
})

type EditFormData = z.infer<typeof editSchema>

interface ContentEditDialogProps {
  conteudo: PostConteudo | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (conteudo: PostConteudo) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function ContentEditDialog({
  conteudo,
  open,
  onOpenChange,
  onSave,
}: ContentEditDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [locais, setLocais] = useState<string[]>([])
  const [inicioDate, setInicioDate] = useState<Date | undefined>()
  const [fimDate, setFimDate] = useState<Date | undefined>()
  const [inicioOpen, setInicioOpen] = useState(false)
  const [fimOpen, setFimOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
  })

  useEffect(() => {
    if (conteudo && open) {
      setIsEditing(false)
      setLocais(conteudo.locais)
      setInicioDate(new Date(conteudo.inicio))
      setFimDate(new Date(conteudo.fim))
      reset({
        titulo: conteudo.titulo,
        resumo: conteudo.resumo,
        link: conteudo.link,
        tipo: conteudo.tipo,
        status: conteudo.status,
      })
    }
  }, [conteudo, open, reset])

  const handleCancel = useCallback(() => {
    if (!conteudo) return
    setIsEditing(false)
    setLocais(conteudo.locais)
    setInicioDate(new Date(conteudo.inicio))
    setFimDate(new Date(conteudo.fim))
    reset({
      titulo: conteudo.titulo,
      resumo: conteudo.resumo,
      link: conteudo.link,
      tipo: conteudo.tipo,
      status: conteudo.status,
    })
  }, [conteudo, reset])

  const onSubmit = (data: EditFormData) => {
    if (!conteudo) return
    const updated: PostConteudo = {
      ...conteudo,
      titulo: data.titulo,
      resumo: data.resumo,
      link: data.link,
      tipo: data.tipo as PostType,
      status: data.status as PostStatus,
      locais,
      inicio: inicioDate
        ? format(inicioDate, "yyyy-MM-dd")
        : conteudo.inicio,
      fim: fimDate ? format(fimDate, "yyyy-MM-dd") : conteudo.fim,
    }
    onSave(updated)
    toast.success("Conteudo atualizado", {
      description: `"${updated.titulo}" foi salvo com sucesso.`,
    })
    setIsEditing(false)
  }

  if (!conteudo) return null

  const tipoValue = watch("tipo") || conteudo.tipo
  const statusValue = watch("status") || conteudo.status
  const linkValue = watch("link") ?? conteudo.link

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {POST_TYPES[conteudo.tipo].label}
            </Badge>
            <Badge variant="outline">
              {POST_STATUS[conteudo.status].label}
            </Badge>
            {isEditing && (
              <Badge className="bg-amber-500/15 text-amber-600">
                Modo Edicao
              </Badge>
            )}
          </div>
          <DialogTitle className="text-balance">
            {isEditing ? "Editar Conteudo" : "Visualizar Conteudo"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edite os campos abaixo e salve as alteracoes."
              : "Visualizando os dados da postagem. Clique em Editar para alterar."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <form
            id="content-edit-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div
              className={cn(
                "flex h-32 items-center justify-center rounded-lg bg-gradient-to-br",
                conteudo.thumb,
              )}
            >
              <span className="text-sm font-medium text-white/80">
                Preview da Midia
              </span>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-titulo">Titulo</Label>
              <Input
                id="edit-titulo"
                disabled={!isEditing}
                {...register("titulo")}
              />
              {errors.titulo && (
                <p className="text-xs text-destructive">
                  {errors.titulo.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-resumo">Resumo</Label>
              <Textarea
                id="edit-resumo"
                disabled={!isEditing}
                className="min-h-24 resize-none"
                {...register("resumo")}
              />
              {errors.resumo && (
                <p className="text-xs text-destructive">
                  {errors.resumo.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="edit-link"
                className="flex items-center gap-1.5"
              >
                <LinkIcon className="size-3.5 text-muted-foreground" />
                Link
              </Label>
              {isEditing ? (
                <Input
                  id="edit-link"
                  type="url"
                  placeholder="https://exemplo.com.br"
                  {...register("link")}
                />
              ) : (
                <div className="flex items-center gap-2">
                  {linkValue ? (
                    <a
                      href={linkValue}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {linkValue}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Nenhum link definido
                    </span>
                  )}
                </div>
              )}
              {errors.link && (
                <p className="text-xs text-destructive">
                  {errors.link.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Tipo de conteudo</Label>
                {isEditing ? (
                  <Select
                    value={tipoValue}
                    onValueChange={(v) => setValue("tipo", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POST_TYPE_KEYS.map((k) => (
                        <SelectItem key={k} value={k}>
                          {POST_TYPES[k].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input disabled value={POST_TYPES[conteudo.tipo].label} />
                )}
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                {isEditing ? (
                  <Select
                    value={statusValue}
                    onValueChange={(v) => setValue("status", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POST_STATUS_KEYS.map((k) => (
                        <SelectItem key={k} value={k}>
                          {POST_STATUS[k].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input disabled value={POST_STATUS[conteudo.status].label} />
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Inicio</Label>
                {isEditing ? (
                  <Popover open={inicioOpen} onOpenChange={setInicioOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start font-normal"
                      >
                        <CalendarIcon className="size-4" />
                        {inicioDate
                          ? format(inicioDate, "dd/MM/yyyy", { locale: ptBR })
                          : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={inicioDate}
                        onSelect={(d) => {
                          setInicioDate(d)
                          setInicioOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Input disabled value={formatDate(conteudo.inicio)} />
                )}
              </div>
              <div className="grid gap-2">
                <Label>Fim</Label>
                {isEditing ? (
                  <Popover open={fimOpen} onOpenChange={setFimOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start font-normal"
                      >
                        <CalendarIcon className="size-4" />
                        {fimDate
                          ? format(fimDate, "dd/MM/yyyy", { locale: ptBR })
                          : "Selecionar"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={fimDate}
                        onSelect={(d) => {
                          setFimDate(d)
                          setFimOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Input disabled value={formatDate(conteudo.fim)} />
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Locais de exibicao</Label>
              {isEditing ? (
                <LocaisSelector
                  selected={locais}
                  onChange={setLocais}
                />
              ) : (
                <div className="rounded-lg border border-border p-3">
                  <LocaisBadges selected={locais} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-3">
              <User className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Autor:</span>
              <span className="text-sm font-medium">{conteudo.autor}</span>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="border-t pt-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="size-4" />
                Cancelar
              </Button>
              <Button type="submit" form="content-edit-form">
                <Save className="size-4" />
                Salvar
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Pencil className="size-4" />
                Editar
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
