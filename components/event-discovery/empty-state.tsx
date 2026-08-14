import { CalendarX2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onReset: () => void
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
      <CalendarX2 className="size-8 text-muted-foreground/50" />
      <p className="text-sm font-medium">Nenhum evento encontrado</p>
      <p className="max-w-xs text-xs text-muted-foreground text-pretty">
        Tente ajustar os filtros ou atualizar suas recomendacoes para descobrir
        novas oportunidades.
      </p>
      <Button variant="outline" size="sm" className="mt-2" onClick={onReset}>
        Limpar filtros
      </Button>
    </div>
  )
}
