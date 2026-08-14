import { CalendarClock, History } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Application } from "./scholarship-data"

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Card className="cursor-grab gap-2 p-3 transition-all hover:border-primary/40 hover:shadow-sm active:cursor-grabbing">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-tight text-pretty">
          {application.title}
        </p>
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        {application.institution}
      </p>
      <div className="flex flex-col gap-1 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CalendarClock className="size-3" />
          Prazo: {application.deadline}
        </span>
        <span className="inline-flex items-center gap-1">
          <History className="size-3" />
          {application.lastMovement}
        </span>
      </div>
    </Card>
  )
}
