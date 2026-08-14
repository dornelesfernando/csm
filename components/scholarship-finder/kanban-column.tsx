import { ApplicationCard } from "./application-card"
import { cn } from "@/lib/utils"
import type { KanbanColumnData } from "./scholarship-data"

interface KanbanColumnProps {
  column: KanbanColumnData
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", column.accent)} />
          <h3 className="text-sm font-semibold">{column.title}</h3>
        </div>
        <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
          {column.applications.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {column.applications.length > 0 ? (
          column.applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        ) : (
          <p className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
            Nenhuma inscricao aqui.
          </p>
        )}
      </div>
    </div>
  )
}
