"use client"

import type { ReactNode } from "react"
import { GripVertical, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardWidgetCardProps {
  title: string
  icon: LucideIcon
  isEditing: boolean
  onRemove: () => void
  children: ReactNode
}

export function DashboardWidgetCard({
  title,
  icon: Icon,
  isEditing,
  onRemove,
  children,
}: DashboardWidgetCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden",
        isEditing &&
          "rounded-xl border border-primary/30 bg-card shadow-sm ring-1 ring-primary/10",
      )}
    >
      {isEditing && (
        <div className="drag-handle flex shrink-0 cursor-grab items-center justify-between gap-2 border-b border-border bg-muted/50 px-3 py-2 active:cursor-grabbing">
          <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-muted-foreground">
            <GripVertical className="size-4 shrink-0" />
            <Icon className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{title}</span>
          </span>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remover widget ${title}`}
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/*
        Area de conteudo: ocupa toda a altura da celula do grid. O widget
        interno (que ja e um Card) e esticado para preencher o espaco e o
        conteudo excedente fica rolavel, preservando a interacao normal.
      */}
      <div
        className={cn(
          "min-h-0 flex-1 overflow-auto",
          isEditing && "[&>*]:rounded-t-none [&>*]:border-0 [&>*]:shadow-none",
          "[&>*]:h-full",
        )}
      >
        {children}
      </div>
    </div>
  )
}
