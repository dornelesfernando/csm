import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ContentForm } from "@/components/murais/content-form"

export default function NovoConteudoPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <Link
          href="/murais/conteudos"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Voltar para conteudos
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          Nova Postagem
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">
          Configure o conteudo, o periodo e os locais de exibicao nos murais.
        </p>
      </div>

      <ContentForm />
    </div>
  )
}
