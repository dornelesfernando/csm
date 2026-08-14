import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  GitBranch,
  FileText,
  Users,
  Trophy,
  FlaskConical,
  Presentation,
} from "lucide-react"

const activities = [
  {
    icon: Trophy,
    title: "Conquista registrada",
    detail: "1o lugar no Hackathon de Inovacao Universitaria",
    time: "Hoje, 09h12",
    color: "text-amber-600",
    dot: "border-l-amber-500",
  },
  {
    icon: FileText,
    title: "Projeto adicionado",
    detail: "API de recomendacao com Node.js e PostgreSQL",
    time: "Ontem, 18h40",
    color: "text-blue-600",
    dot: "border-l-blue-500",
  },
  {
    icon: FlaskConical,
    title: "Experiencia documentada",
    detail: "Experimento de modelos preditivos na Iniciacao Cientifica",
    time: "2 dias atras",
    color: "text-emerald-600",
    dot: "border-l-emerald-500",
  },
  {
    icon: Presentation,
    title: "Evento concluido",
    detail: "Workshop de UX Research aplicado a produtos digitais",
    time: "4 dias atras",
    color: "text-violet-600",
    dot: "border-l-violet-500",
  },
  {
    icon: Users,
    title: "Aprendizado em grupo",
    detail: "Mentoria com calouros do curso de Computacao",
    time: "6 dias atras",
    color: "text-blue-600",
    dot: "border-l-blue-500",
  },
]

export function RecentActivities() {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <GitBranch className="size-4 text-primary" />
          Atividades recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 rounded-lg border-l-4 bg-muted/30 p-3 ${item.dot}`}
            >
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-background">
                <item.icon className={`size-3.5 ${item.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground text-pretty">{item.detail}</p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground font-mono">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
