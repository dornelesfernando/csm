"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileText } from "lucide-react"
import { toast } from "sonner"
import { CENTROS, CONTEUDOS, type Tela } from "./murais-data"
import { TypeBadge, StatusBadge } from "./content-badges"

interface ScreenSettingsDialogProps {
  tela: Tela | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function ScreenSettingsDialog({
  tela,
  open,
  onOpenChange,
}: ScreenSettingsDialogProps) {
  const linkedContents = tela
    ? CONTEUDOS.filter(
        (c) =>
          c.alvo.includes(tela.centro) &&
          (c.status === "ativo" || c.status === "agendado"),
      )
    : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {tela && (
          <>
            <DialogHeader>
              <DialogTitle>Configurações da Tela</DialogTitle>
              <DialogDescription>
                Ajuste as informações e conteúdos vinculados a esta tela.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="geral">
              <TabsList className="w-full">
                <TabsTrigger value="geral" className="flex-1">
                  Geral
                </TabsTrigger>
                <TabsTrigger value="conteudos" className="flex-1">
                  Conteúdos Vinculados
                </TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="screen-nome">Nome da Tela</Label>
                  <Input id="screen-nome" defaultValue={tela.nome} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="screen-local">Localização</Label>
                  <Input id="screen-local" defaultValue={tela.local} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="screen-centro">Centro / Prédio</Label>
                  <Select defaultValue={tela.centro}>
                    <SelectTrigger id="screen-centro">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CENTROS.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="conteudos" className="mt-4">
                <ScrollArea className="h-[280px] pr-3">
                  {linkedContents.length > 0 ? (
                    <div className="space-y-2">
                      {linkedContents.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center gap-3 rounded-lg border border-border p-3"
                        >
                          <div
                            className={`hidden size-10 shrink-0 rounded-md bg-gradient-to-br sm:flex ${c.thumb}`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {c.titulo}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <TypeBadge type={c.tipo} />
                              <StatusBadge status={c.status} />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatDate(c.inicio)} até {formatDate(c.fim)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
                      <FileText className="size-8 opacity-50" />
                      <p className="text-sm">
                        Nenhum conteúdo vinculado a esta tela no momento.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  toast.success("Configurações salvas", {
                    description: tela.nome,
                  })
                  onOpenChange(false)
                }}
              >
                Salvar Alterações
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
