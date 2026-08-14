"use client"

import { Archive, RotateCcw, Check, Ban } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  CATEGORY_META,
  type LattesSuggestion,
} from "./radar-data"

type ArchivedSuggestionsSheetProps = {
  archived: LattesSuggestion[]
  onRestore: (id: string) => void
}

export function ArchivedSuggestionsSheet({
  archived,
  onRestore,
}: ArchivedSuggestionsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <Archive className="size-4" />
          Ver itens arquivados ({archived.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Sugestoes arquivadas</SheetTitle>
          <SheetDescription>
            Itens ignorados ou ja adicionados ao Lattes. Restaure para envia-los
            de volta ao feed principal.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="-mx-6 flex-1 px-6">
          {archived.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Nenhuma sugestao arquivada.
            </p>
          ) : (
            <div className="space-y-3 py-4">
              {archived.map((item) => {
                const category = CATEGORY_META[item.category]
                const CategoryIcon = category.icon
                const isConfirmed = item.status === "confirmed"
                return (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <CategoryIcon className="size-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-tight">
                            {item.title}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {category.label}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          isConfirmed
                            ? "shrink-0 gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "shrink-0 gap-1 text-muted-foreground"
                        }
                      >
                        {isConfirmed ? (
                          <Check className="size-3" />
                        ) : (
                          <Ban className="size-3" />
                        )}
                        {isConfirmed ? "Adicionado" : "Ignorado"}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-7 w-full justify-center gap-1.5 text-xs"
                      onClick={() => onRestore(item.id)}
                    >
                      <RotateCcw className="size-3.5" />
                      Restaurar sugestao
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
