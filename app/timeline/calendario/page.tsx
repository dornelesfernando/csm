import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AgendaCalendar } from "@/components/agenda/agenda-calendar"

export default function CalendarioPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Calendario Academico
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Visualize suas disciplinas, reunioes e compromissos por mes, semana ou dia.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Novo compromisso
        </Button>
      </div>

      <AgendaCalendar />
    </div>
  )
}
