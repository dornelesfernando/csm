import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { scholarshipStats } from "./scholarship-data"

export function ScholarshipStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {scholarshipStats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.id} className="flex items-center gap-3 p-4">
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                stat.accent,
              )}
            >
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-bold font-mono leading-none">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-tight text-muted-foreground text-pretty">
                {stat.label}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
