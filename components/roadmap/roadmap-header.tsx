import Link from "next/link"
import { ArrowLeft, Upload, Download, Map } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RoadmapHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Map className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Academic Roadmap Planner
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Engenharia de Computacao • Visao Estrategica do PPC
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="size-4" />
          Importar PPC (PDF/JSON)
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="size-4" />
          Exportar Planejamento
        </Button>
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link href="/toolkit">
            <ArrowLeft className="size-4" />
            Voltar ao Toolkit
          </Link>
        </Button>
      </div>
    </div>
  )
}
