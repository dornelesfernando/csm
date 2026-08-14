"use client"

import { RadarIcon, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

type RadarEmptyStateProps = {
  onRefresh: () => void
}

export function RadarEmptyState({ onRefresh }: RadarEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <RadarIcon className="size-7" />
      </div>
      <h3 className="mt-4 font-semibold">Nenhuma nova indicacao encontrada.</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground text-pretty">
        A IA continuara monitorando suas atividades e notificara automaticamente
        quando identificar novas oportunidades para enriquecer seu Curriculo
        Lattes.
      </p>
      <Button variant="outline" className="mt-5 gap-2" onClick={onRefresh}>
        <RefreshCw className="size-4" />
        Verificar novamente
      </Button>
    </div>
  )
}
