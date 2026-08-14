import { MuraisNav } from "@/components/murais/murais-nav"
import { ContentTable } from "@/components/murais/content-table"

export default function ConteudosPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          Gerenciamento de Conteudos
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">
          Crie, filtre e acompanhe todas as postagens exibidas nos murais.
        </p>
      </div>

      <MuraisNav />

      <ContentTable />
    </div>
  )
}
