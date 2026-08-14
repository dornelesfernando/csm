import { Inbox, Zap, CheckCircle2, Ban } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"

type RadarStatsProps = {
  pending: number
  prepared: number
  confirmed: number
  ignored: number
}

type StatItem = {
  label: string
  value: number
  icon: LucideIcon
  accent: string
}

export function RadarStats({
  pending,
  prepared,
  confirmed,
  ignored,
}: RadarStatsProps) {
  const items: StatItem[] = [
    { label: "Pendentes", value: pending, icon: Inbox, accent: "text-primary" },
    { label: "Preparadas", value: prepared, icon: Zap, accent: "text-amber-500" },
    {
      label: "Confirmadas",
      value: confirmed,
      icon: CheckCircle2,
      accent: "text-emerald-500",
    },
    { label: "Ignoradas", value: ignored, icon: Ban, accent: "text-muted-foreground" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label} className="p-4">
            <div className="flex items-center gap-2">
              <Icon className={`size-4 ${item.accent}`} />
              <span className="text-xs font-medium text-muted-foreground">
                {item.label}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight">{item.value}</p>
          </Card>
        )
      })}
    </div>
  )
}
