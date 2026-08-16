import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { CompetenciesWorkspace } from "@/components/competencies/competencies-workspace"

export default function CompetenciesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Competencias
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            As competencias que voce desenvolveu ao longo da trajetoria e as experiencias que as geraram.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <FileDown className="size-4" />
          Exportar mapa
        </Button>
      </div>

      <CompetenciesWorkspace />
    </div>
  )
}
