import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ContributionGrid } from "@/components/timeline/contribution-grid"
import { TimelineStats } from "@/components/timeline/timeline-stats"
import { TimelineFeed } from "@/components/timeline/timeline-feed"

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Linha do Tempo Academica
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Toda a sua trajetoria universitaria reunida em ordem cronologica.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Novo registro
        </Button>
      </div>

      <TimelineStats />

      <ContributionGrid />

      <TimelineFeed />
    </div>
  )
}
