"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Plus, PackageOpen } from "lucide-react"
import { dashboardWidgets } from "@/components/dashboard/widget-registry"

interface AddWidgetDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** ids dos widgets atualmente removidos (disponiveis para adicionar) */
  removedIds: string[]
  onAddWidget: (id: string) => void
}

export function AddWidgetDrawer({
  open,
  onOpenChange,
  removedIds,
  onAddWidget,
}: AddWidgetDrawerProps) {
  const available = dashboardWidgets.filter((w) => removedIds.includes(w.id))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Adicionar widgets</SheetTitle>
          <SheetDescription>
            Escolha quais cartoes mostrar no seu painel. Eles aparecem ao final
            do layout e podem ser reposicionados.
          </SheetDescription>
        </SheetHeader>

        {available.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <PackageOpen className="size-10" />
            <p className="text-sm text-pretty">
              Todos os widgets disponiveis ja estao no seu painel.
            </p>
          </div>
        ) : (
          <ScrollArea className="-mx-2 flex-1 px-2">
            <ul className="flex flex-col gap-2 py-2">
              {available.map((widget) => {
                const Icon = widget.icon
                return (
                  <li key={widget.id}>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Icon className="size-4" />
                      </span>
                      <span className="flex-1 text-sm font-medium leading-tight text-card-foreground">
                        {widget.title}
                      </span>
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => onAddWidget(widget.id)}
                      >
                        <Plus className="size-4" />
                        Adicionar
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}
