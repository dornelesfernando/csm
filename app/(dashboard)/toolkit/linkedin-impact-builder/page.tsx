import Link from "next/link"
import { ArrowLeft, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PostGenerator } from "@/components/linkedin/post-generator"
import { ProfileOptimizer } from "@/components/linkedin/profile-optimizer"
import { ContentRadar } from "@/components/linkedin/content-radar"

export default function LinkedInImpactBuilderPage() {
  return (
    <div className="space-y-6">
      {/* Cabecalho da ferramenta */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Linkedin className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-balance">
              LinkedIn Impact Builder
            </h1>
            <p className="text-sm text-muted-foreground text-pretty">
              Transforme sua trajetoria tecnica em autoridade profissional.
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
      <Tabs defaultValue="gerador" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="gerador">Gerador de Publicacoes</TabsTrigger>
          <TabsTrigger value="otimizador">Otimizador de Perfil</TabsTrigger>
          <TabsTrigger value="radar">Radar de Publicacoes</TabsTrigger>
        </TabsList>

        <TabsContent value="gerador" className="mt-6">
          <PostGenerator />
        </TabsContent>
        <TabsContent value="otimizador" className="mt-6">
          <ProfileOptimizer />
        </TabsContent>
        <TabsContent value="radar" className="mt-6">
          <ContentRadar />
        </TabsContent>
      </Tabs>
    </div>
  )
}
