import { Moon, Footprints, Activity, Heart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function WellbeingWidget() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Heart className="size-4 text-primary" />
          Bem-estar e rotina
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sono */}
        <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300">
            <Moon className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Sono - noite anterior</p>
            <p className="text-sm font-semibold">7h 24min</p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-300">
            Otimo
          </span>
        </div>

        {/* Corrida / check-in */}
        <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300">
            <Footprints className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Corrida matinal - 05:45</p>
            <p className="text-sm font-semibold">5,2 km - 28min</p>
          </div>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
            Concluida
          </span>
        </div>

        {/* Energia atual */}
        <div className="rounded-md bg-muted/50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
              <Activity className="size-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Nivel de energia</p>
              <p className="text-sm font-semibold">82% - Alta disposicao</p>
            </div>
          </div>
          <Progress value={82} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
