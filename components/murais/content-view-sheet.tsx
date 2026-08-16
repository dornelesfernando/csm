"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Pencil, Calendar, User } from "lucide-react"
import { CONTENT_TYPES, type Conteudo } from "./murais-data"
import { TypeBadge, StatusBadge, TargetBadges } from "./content-badges"

interface ContentViewSheetProps {
  conteudo: Conteudo | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function ContentViewSheet({
  conteudo,
  open,
  onOpenChange,
}: ContentViewSheetProps) {
  const tipo = conteudo ? CONTENT_TYPES[conteudo.tipo] : null
  const TipoIcon = tipo?.icon

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-lg">
        {conteudo && (
          <>
            <SheetHeader>
              <div className="flex items-center gap-2">
                <TypeBadge type={conteudo.tipo} />
                <StatusBadge status={conteudo.status} />
              </div>
              <SheetTitle className="text-balance">{conteudo.titulo}</SheetTitle>
              <SheetDescription>{conteudo.resumo}</SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div
                  className={`flex h-40 items-center justify-center rounded-lg bg-gradient-to-br ${conteudo.thumb}`}
                >
                  {TipoIcon && <TipoIcon className="size-12 text-white/80" />}
                </div>

                <div className="flex items-start gap-3">
                  <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Autor
                    </p>
                    <p className="text-sm">{conteudo.autor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Período de exibição
                    </p>
                    <p className="text-sm">
                      {formatDate(conteudo.inicio)}
                      {" até "}
                      {formatDate(conteudo.fim)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Locais de exibição
                  </p>
                  <TargetBadges alvo={conteudo.alvo} />
                </div>
              </div>
            </div>

            <SheetFooter className="border-t border-border pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              <Button className="gap-2">
                <Pencil className="size-4" />
                Editar
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
