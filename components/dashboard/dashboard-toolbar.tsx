"use client"

import { Check, LayoutGrid, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardToolbarProps {
  isEditing: boolean
  removedCount: number
  onToggleEditing: () => void
  onOpenDrawer: () => void
  onReset: () => void
}

export function DashboardToolbar({
  isEditing,
  removedCount,
  onToggleEditing,
  onOpenDrawer,
  onReset,
}: DashboardToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {isEditing && (
        <>
          <Button variant="outline" className="gap-2" onClick={onOpenDrawer}>
            <Plus className="size-4" />
            Widgets
            {removedCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {removedCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            aria-label="Restaurar layout padrao"
            title="Restaurar layout padrao"
          >
            <RotateCcw className="size-4" />
          </Button>
        </>
      )}
      <Button
        variant={isEditing ? "default" : "secondary"}
        className="gap-2"
        onClick={onToggleEditing}
      >
        {isEditing ? (
          <>
            <Check className="size-4" />
            Concluir
          </>
        ) : (
          <>
            <LayoutGrid className="size-4" />
            Personalizar Layout
          </>
        )}
      </Button>
    </div>
  )
}
