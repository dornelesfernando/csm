import { Suspense } from "react"
import { AssistantChat } from "@/components/assistant/assistant-chat"
import { AssistantContext } from "@/components/assistant/assistant-context"

export default function AssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          Assistente Academico
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">
          Seu copiloto academico. Ele conhece suas atividades, competencias, objetivos e linha do tempo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Suspense fallback={null}>
          <AssistantChat />
        </Suspense>
        <div className="hidden lg:block">
          <AssistantContext />
        </div>
      </div>
    </div>
  )
}
