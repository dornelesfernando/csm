import Link from "next/link"
import { ArrowLeft, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PreparationTab } from "@/components/lattes/preparation-tab"
import { RadarTab } from "@/components/lattes/radar-tab"

export default function LattesAssistantPage() {
  return (
    <div className="space-y-6">
      {/* Cabecalho da ferramenta */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Award className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-balance">
              Lattes Assistant
            </h1>
            <p className="text-sm text-muted-foreground text-pretty">
              Organize e prepare suas informacoes para o Curriculo Lattes.
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/toolkit">
            <ArrowLeft className="size-4" />
            Voltar ao Toolkit
          </Link>
        </Button>
      </div>

      {/* Navegacao por abas */}
      <Tabs defaultValue="radar" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="preparacao">Preparacao do Curriculo</TabsTrigger>
          <TabsTrigger value="radar">Radar de Indicacoes</TabsTrigger>
        </TabsList>

        <TabsContent value="preparacao" className="mt-6">
          <PreparationTab />
        </TabsContent>
        <TabsContent value="radar" className="mt-6">
          <RadarTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
