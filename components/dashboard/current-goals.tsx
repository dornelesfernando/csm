import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Plus } from "lucide-react"

const goals = [
  { title: "Concluir Iniciacao Cientifica", progress: 70, status: "No prazo", tone: "text-emerald-600" },
  { title: "Publicar 1 artigo academico", progress: 35, status: "Em andamento", tone: "text-blue-600" },
  { title: "Participar de 3 eventos tecnicos", progress: 66, status: "2 de 3", tone: "text-blue-600" },
  { title: "Dominar fundamentos de IA", progress: 45, status: "Em andamento", tone: "text-blue-600" },
]

export function CurrentGoals() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Target className="size-4 text-primary" />
          Objetivos atuais
        </CardTitle>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-accent"
        >
          <Plus className="size-3" />
          Novo
        </button>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.title}
            className="space-y-2 rounded-lg border border-border bg-muted/20 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-pretty">{goal.title}</span>
              <span className={`shrink-0 text-[11px] font-medium ${goal.tone}`}>
                {goal.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={goal.progress} className="h-1.5 flex-1" />
              <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                {goal.progress}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
