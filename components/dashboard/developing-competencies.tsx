import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp } from "lucide-react"

const competencies = [
  { name: "Programacao e Logica", level: 78, trend: "+8%", evidences: 14 },
  { name: "Trabalho em Equipe", level: 65, trend: "+5%", evidences: 9 },
  { name: "Comunicacao", level: 52, trend: "+12%", evidences: 7 },
  { name: "Pesquisa Cientifica", level: 41, trend: "+3%", evidences: 5 },
]

export function DevelopingCompetencies() {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4 text-primary" />
          Competencias em desenvolvimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {competencies.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium">{item.name}</span>
              <div className="flex shrink-0 items-center gap-2">
                <span className="flex items-center gap-0.5 text-[11px] font-medium text-emerald-600">
                  <TrendingUp className="size-3" />
                  {item.trend}
                </span>
                <span className="text-sm font-mono font-semibold">{item.level}%</span>
              </div>
            </div>
            <Progress value={item.level} className="h-1.5" />
            <p className="text-[11px] text-muted-foreground">
              {item.evidences} evidencias coletadas
            </p>
          </div>
        ))}
        <Badge variant="secondary" className="w-full justify-center py-1 text-xs font-normal">
          4 de 12 competencias ativas neste semestre
        </Badge>
      </CardContent>
    </Card>
  )
}
