import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onReset: () => void
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
      <SearchX className="size-8 text-muted-foreground/50" />
      <p className="text-sm font-medium">Nenhuma oportunidade encontrada.</p>
      <p className="max-w-xs text-xs text-muted-foreground text-pretty">
        Tente alterar os filtros ou atualizar seu perfil para descobrir novos
        editais compativeis.
      </p>
      <Button variant="outline" size="sm" className="mt-2" onClick={onReset}>
        Atualizar Busca
      </Button>
    </div>
  )
}
