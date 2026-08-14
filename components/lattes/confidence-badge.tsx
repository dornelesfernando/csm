import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ConfidenceBadgeProps = {
  confidence: number
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const tone =
    confidence > 90
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : confidence >= 70
        ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
        : "border-border bg-muted text-muted-foreground"

  return (
    <Badge variant="outline" className={cn("shrink-0 font-medium", tone)}>
      {confidence}% de confianca
    </Badge>
  )
}
