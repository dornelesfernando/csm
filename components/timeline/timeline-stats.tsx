import { Card, CardContent } from "@/components/ui/card"
import { TIMELINE, CATEGORIES, type CategoryKey } from "./timeline-data"

const HIGHLIGHTS: { key: CategoryKey; sublabel: string }[] = [
  { key: "projetos", sublabel: "construidos" },
  { key: "competicoes", sublabel: "disputadas" },
  { key: "certificacoes", sublabel: "conquistadas" },
  { key: "publicacoes", sublabel: "publicadas" },
]

export function TimelineStats() {
  const counts = TIMELINE.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1
    return acc
  }, {})

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {HIGHLIGHTS.map(({ key, sublabel }) => {
        const cat = CATEGORIES[key]
        const Icon = cat.icon
        return (
          <Card key={key} className="bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${cat.bg}`}
              >
                <Icon className={`size-5 ${cat.text}`} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold leading-none">
                  {counts[key] || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cat.label} {sublabel}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
