import { KanbanColumn } from "./kanban-column"
import { kanbanColumns } from "./scholarship-data"

export function KanbanBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {kanbanColumns.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  )
}
