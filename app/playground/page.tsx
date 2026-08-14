import {
  NovaTarefaDialog,
  RegistrarHorasSheet,
  NovoCardDialog,
  ReportarIncidenteDialog,
  NovoProjetoSheet,
  NovaIdeiaDialog,
  NovoMilestoneDialog,
  LancamentoFinanceiroDialog,
} from "@/components/forms"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PlaygroundPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Playground de Formularios</h1>
        <p className="text-sm text-muted-foreground">
          Teste todos os dialogs e sheets de criacao do sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Toolbar de Acoes</CardTitle>
          <CardDescription>
            Clique nos botoes abaixo para abrir os respectivos formularios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pessoal */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Pessoal</h3>
            <div className="flex flex-wrap gap-3">
              <NovaTarefaDialog />
              <RegistrarHorasSheet />
            </div>
          </div>

          <Separator />

          {/* Squad */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Squad - Melhorias</h3>
            <div className="flex flex-wrap gap-3">
              <NovoCardDialog />
            </div>
          </div>

          <Separator />

          {/* Incidentes */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Squad - Incidentes</h3>
            <div className="flex flex-wrap gap-3">
              <ReportarIncidenteDialog />
            </div>
          </div>

          <Separator />

          {/* Projetos */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Squad - Projetos</h3>
            <div className="flex flex-wrap gap-3">
              <NovoProjetoSheet />
            </div>
          </div>

          <Separator />

          {/* Ideias */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Squad - Banco de Ideias</h3>
            <div className="flex flex-wrap gap-3">
              <NovaIdeiaDialog />
            </div>
          </div>

          <Separator />

          {/* Planejamento */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Squad - Planejamento</h3>
            <div className="flex flex-wrap gap-3">
              <NovoMilestoneDialog />
            </div>
          </div>

          <Separator />

          {/* Financeiro */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Squad - Financeiro</h3>
            <div className="flex flex-wrap gap-3">
              <LancamentoFinanceiroDialog />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
