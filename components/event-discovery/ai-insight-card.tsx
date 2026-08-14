import { Sparkles, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { aiInsight } from "./event-data"

export function AIInsightCard() {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-card p-5">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
          Insight da IA
        </p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-pretty">
        {aiInsight.summary}
      </p>

      <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <ArrowUpRight className="size-3.5 text-primary" />
          Proximo destaque
        </div>
        <p className="mt-1 text-sm font-semibold leading-tight">
          {aiInsight.highlightTitle}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground text-pretty">
          {aiInsight.highlightDescription}
        </p>
      </div>
    </Card>
  )
}
