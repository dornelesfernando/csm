import { Wrench } from "lucide-react"
import { ToolkitCatalog } from "@/components/toolkit/toolkit-catalog"
import { AiRecommendation } from "@/components/toolkit/ai-recommendation"

export default function ToolkitPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wrench className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-balance">
              Academic Toolkit
            </h1>
            <p className="text-sm text-muted-foreground text-pretty">
              Um catalogo de ferramentas para impulsionar cada etapa da sua
              graduacao.
            </p>
          </div>
        </div>
      </div>

      <AiRecommendation />

      <ToolkitCatalog />
    </div>
  )
}
