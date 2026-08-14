"use client"

import { Zap, Check, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type SuggestionActionsProps = {
  onPrepare: () => void
  onConfirm: () => void
  onIgnore: () => void
}

export function SuggestionActions({
  onPrepare,
  onConfirm,
  onIgnore,
}: SuggestionActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" className="gap-1.5" onClick={onPrepare}>
        <Zap className="size-4" />
        Preparar para o Lattes
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5" onClick={onConfirm}>
        <Check className="size-4" />
        Ja adicionei ao Lattes
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="gap-1.5 text-muted-foreground"
        onClick={onIgnore}
      >
        <Trash2 className="size-4" />
        Ignorar
      </Button>
    </div>
  )
}
