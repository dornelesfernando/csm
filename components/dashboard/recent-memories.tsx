import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookMarked, Quote, ArrowRight } from "lucide-react"

const memories = [
  {
    type: "Aprendizado",
    text: "Entendi na pratica como normalizacao evita redundancia e melhora a integridade dos dados.",
    tag: "Banco de Dados II",
    date: "Hoje",
  },
  {
    type: "Reflexao",
    text: "Liderar o grupo do hackathon me mostrou que organizar o time e tao importante quanto codar.",
    tag: "Soft Skills",
    date: "Ontem",
  },
  {
    type: "Insight",
    text: "Conectei conceitos de algebra linear com o funcionamento de redes neurais.",
    tag: "Inteligencia Artificial",
    date: "3 dias atras",
  },
]

export function RecentMemories() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <BookMarked className="size-4 text-primary" />
          Memoria academica recente
        </CardTitle>
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] font-medium text-primary transition-colors hover:underline"
        >
          Ver tudo
          <ArrowRight className="size-3" />
        </button>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {memories.map((memory, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4"
          >
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-[10px]">
                {memory.type}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{memory.date}</span>
            </div>
            <div className="flex flex-1 gap-2">
              <Quote className="size-4 shrink-0 text-primary/40" />
              <p className="text-sm leading-relaxed text-pretty">{memory.text}</p>
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">
              #{memory.tag}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
