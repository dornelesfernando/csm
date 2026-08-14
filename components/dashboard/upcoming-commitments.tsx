import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarClock } from "lucide-react"

const commitments = [
  {
    title: "Entrega - Projeto de Banco de Dados",
    course: "Banco de Dados II",
    date: "Amanha",
    time: "23h59",
    tone: "urgent" as const,
  },
  {
    title: "Apresentacao do Seminario de IA",
    course: "Inteligencia Artificial",
    date: "Qui, 11 jun",
    time: "14h00",
    tone: "soon" as const,
  },
  {
    title: "Prova - Estruturas de Dados",
    course: "Estruturas de Dados",
    date: "Seg, 15 jun",
    time: "10h00",
    tone: "default" as const,
  },
  {
    title: "Reuniao - Grupo de Pesquisa",
    course: "Iniciacao Cientifica",
    date: "Qua, 17 jun",
    time: "16h30",
    tone: "default" as const,
  },
]

const toneStyles = {
  urgent: { border: "border-l-red-500", badge: "destructive" as const, label: "Urgente" },
  soon: { border: "border-l-amber-500", badge: "secondary" as const, label: "Em breve" },
  default: { border: "border-l-blue-500", badge: "outline" as const, label: "Agendado" },
}

export function UpcomingCommitments() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <CalendarClock className="size-4 text-primary" />
          Proximos compromissos
        </CardTitle>
        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
          {commitments.length}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        {commitments.map((item) => {
          const tone = toneStyles[item.tone]
          return (
            <div
              key={item.title}
              className={`flex items-center gap-3 rounded-lg border-l-4 bg-muted/30 p-3 ${tone.border}`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.course}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs font-medium">{item.date}</p>
                <p className="text-[11px] text-muted-foreground font-mono">{item.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
