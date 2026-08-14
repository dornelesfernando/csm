import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Upload,
  RefreshCw,
  WifiOff,
  CalendarX,
  PencilLine,
  type LucideIcon,
} from "lucide-react"
import { ATIVIDADES, type Atividade } from "./murais-data"

const meta: Record<
  Atividade["tipo"],
  { icon: LucideIcon; text: string; bg: string }
> = {
  publicacao: { icon: Upload, text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
  sync: { icon: RefreshCw, text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  tela: { icon: WifiOff, text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10" },
  expiracao: { icon: CalendarX, text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  edicao: { icon: PencilLine, text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10" },
}

export function SystemActivity() {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Activity className="size-4 text-primary" />
          Atividade recente
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ol className="relative">
          {ATIVIDADES.map((a, i) => {
            const m = meta[a.tipo]
            return (
              <li
                key={a.id}
                className="flex items-start gap-3 px-6 py-3 transition-colors hover:bg-muted/40"
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${m.bg}`}
                  >
                    <m.icon className={`size-4 ${m.text}`} />
                  </div>
                  {i < ATIVIDADES.length - 1 && (
                    <span className="mt-1 h-full w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <p className="text-sm font-medium leading-tight">{a.titulo}</p>
                  <p className="text-xs text-muted-foreground text-pretty">
                    {a.detalhe}
                  </p>
                  <span className="mt-1 inline-block text-[11px] font-mono text-muted-foreground/70">
                    {a.tempo}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </CardContent>
    </Card>
  )
}
