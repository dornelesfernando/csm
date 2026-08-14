import { BrainCircuit, Clock, Pencil, RefreshCw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { searchProfile } from "./scholarship-data"

export function SearchProfileCard() {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.05] via-card to-card p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BrainCircuit className="size-4" />
          </span>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold leading-tight">
                Perfil utilizado nas recomendacoes
              </p>
              <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" />
                Ultima atualizacao: {searchProfile.lastUpdated}
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              <ProfileField label="Curso" value={searchProfile.course} />
              <ProfileField label="Semestre" value={searchProfile.semester} />
              <ProfileField label="Objetivo" value={searchProfile.goal} />
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Interesses
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {searchProfile.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="font-normal"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pencil className="size-3.5" />
            Editar Perfil
          </Button>
          <Button size="sm" className="gap-1.5">
            <RefreshCw className="size-3.5" />
            Atualizar Perfil de Busca
          </Button>
        </div>
      </div>
    </Card>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}
