import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Banner de recomendacao da IA: sugere uma ferramenta com base no contexto
// atual do estudante (projetos e lideranca tecnica em andamento).
export function AiRecommendation() {
  return (
    <Card className="relative overflow-hidden border-primary/30 bg-primary/[0.04] p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl"
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="size-5" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            Sugestao inteligente
          </span>
          <p className="text-sm leading-relaxed text-pretty text-foreground/90">
            Notei que voce esta focado no desenvolvimento do{" "}
            <span className="font-medium text-foreground">Nexus SM</span> e na
            gestao do{" "}
            <span className="font-medium text-foreground">PGI-PROA</span>. Que
            tal utilizar o Lattes Assistant para documentar essas liderancas
            tecnicas no seu curriculo?
          </p>
        </div>

        <Button className="shrink-0 gap-1.5 sm:self-center" asChild>
          <Link href="/toolkit/lattes-assistant">
            Abrir Lattes Assistant
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
