import Link from "next/link"
import { ArrowLeft, CalendarSearch, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventHeaderProps {
  onRefresh?: () => void
}

export function EventHeader({ onRefresh }: EventHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <CalendarSearch className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Event Discovery
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground text-pretty">
            Encontre as proximas competicoes, congressos e oportunidades para
            expandir seu networking.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" className="gap-2" onClick={onRefresh}>
          <RefreshCw className="size-4" />
          Atualizar recomendacoes
        </Button>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/toolkit">
            <ArrowLeft className="size-4" />
            Voltar ao Toolkit
          </Link>
        </Button>
      </div>
    </div>
  )
}
