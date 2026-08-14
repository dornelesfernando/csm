import { MemoryWorkspace } from "@/components/memory/memory-workspace"

export default function MemoriaPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Memoria Academica
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">
          Seu diario academico inteligente. Capture aprendizados, reflexoes e
          conquistas em segundos e deixe o sistema organizar tudo por voce.
        </p>
      </header>

      <MemoryWorkspace />
    </div>
  )
}
