import Link from "next/link"
import { ArrowLeft, GraduationCap, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScholarshipHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Scholarship Finder
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground text-pretty">
            Editais e oportunidades mapeadas para o seu perfil academico.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/toolkit">
            <ArrowLeft className="size-4" />
            Voltar ao Toolkit
          </Link>
        </Button>
        <Button variant="secondary" className="gap-2">
          <RefreshCw className="size-4" />
          Atualizar Recomendacoes
        </Button>
      </div>
    </div>
  )
}
