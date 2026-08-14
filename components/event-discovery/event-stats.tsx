import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { eventStats } from "./event-data"

export function EventStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {eventStats.map((stat) => (
        <Card key={stat.id} className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold font-mono tracking-tight">
              {stat.value}
            </span>
            {stat.trend && (
              <Badge variant="secondary" className="text-[10px] font-medium">
                {stat.trend}
              </Badge>
            )}
          </div>
          <div>
            <p className="text-sm font-medium leading-tight">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.helper}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
