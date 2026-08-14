"use client"

import { useState } from "react"
import { Eye, Globe, Users, Download, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function PrivacyForm() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "team",
    showEmail: false,
    showPhone: false,
    showActivity: true,
    showOnlineStatus: true,
    allowSearchEngines: false,
    dataSharing: false,
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="size-5 text-primary" />
            <div>
              <CardTitle>Visibilidade do Perfil</CardTitle>
              <CardDescription>
                Controle quem pode ver suas informacoes.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="size-4 text-muted-foreground" />
              <div>
                <Label>Visibilidade do perfil</Label>
                <p className="text-xs text-muted-foreground">
                  Quem pode ver seu perfil completo.
                </p>
              </div>
            </div>
            <Select
              value={privacy.profileVisibility}
              onValueChange={(value) =>
                setPrivacy({ ...privacy, profileVisibility: value })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Publico</SelectItem>
                <SelectItem value="team">Meu time</SelectItem>
                <SelectItem value="private">Somente eu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            {[
              {
                key: "showEmail" as const,
                icon: Users,
                label: "Exibir e-mail",
                desc: "Membros do time podem ver seu e-mail.",
              },
              {
                key: "showPhone" as const,
                icon: Users,
                label: "Exibir telefone",
                desc: "Membros do time podem ver seu telefone.",
              },
              {
                key: "showActivity" as const,
                icon: Eye,
                label: "Exibir atividade recente",
                desc: "Mostrar suas acoes recentes na timeline do projeto.",
              },
              {
                key: "showOnlineStatus" as const,
                icon: Globe,
                label: "Status online",
                desc: "Mostrar quando voce esta online para outros membros.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="size-4 text-muted-foreground" />
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-xs text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={privacy[item.key]}
                  onCheckedChange={(checked) =>
                    setPrivacy({ ...privacy, [item.key]: checked })
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <Button>
              <Save className="mr-2 size-4" />
              Salvar privacidade
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados e Conta</CardTitle>
          <CardDescription>
            Gerencie seus dados pessoais e o estado da sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Download className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Exportar meus dados</p>
                <p className="text-xs text-muted-foreground">
                  Baixe uma copia de todos os seus dados em formato JSON.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Exportar
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-center gap-3">
              <Trash2 className="size-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">
                  Excluir conta
                </p>
                <p className="text-xs text-muted-foreground">
                  Esta acao e permanente e nao pode ser desfeita.
                </p>
              </div>
            </div>
            <Button variant="destructive" size="sm">
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
