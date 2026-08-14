import { Radar } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type RadarHeaderProps = {
  pendingCount: number
}

export function RadarHeader({ pendingCount }: RadarHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Radar className="size-5" />
        </div>
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold tracking-tight text-balance">
            Radar de Indicacoes
          </h2>
          <p className="text-sm text-muted-foreground text-pretty">
            A IA identificou atividades recentes que podem enriquecer seu
            curriculo oficial. Revise as sugestoes e escolha como deseja
            trata-las.
          </p>
        </div>
      </div>
      {pendingCount > 0 && (
        <Badge
          variant="secondary"
          className="gap-1.5 border border-primary/20 bg-primary/10 text-primary"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {pendingCount} sugestoes pendentes
        </Badge>
      )}
    </div>
  )
}
