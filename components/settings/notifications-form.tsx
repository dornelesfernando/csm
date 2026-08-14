"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare, AlertCircle } from "lucide-react"
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
import { Save } from "lucide-react"

const notificationCategories = [
  {
    id: "tasks",
    icon: AlertCircle,
    title: "Tarefas",
    description: "Novas atribuicoes, mudancas de status e prazos.",
    email: true,
    push: true,
    inApp: true,
  },
  {
    id: "mentions",
    icon: MessageSquare,
    title: "Mencoes e Comentarios",
    description: "Quando alguem te menciona ou comenta em suas tarefas.",
    email: true,
    push: true,
    inApp: true,
  },
  {
    id: "projects",
    icon: Bell,
    title: "Atualizacoes de Projeto",
    description: "Progresso, marcos atingidos e relatórios semanais.",
    email: false,
    push: true,
    inApp: true,
  },
  {
    id: "system",
    icon: Mail,
    title: "Sistema e Seguranca",
    description: "Login em novos dispositivos, alteracoes de permissao.",
    email: true,
    push: false,
    inApp: true,
  },
]

export function NotificationsForm() {
  const [categories, setCategories] = useState(notificationCategories)
  const [digestFrequency, setDigestFrequency] = useState("daily")

  const toggleNotification = (
    categoryId: string,
    channel: "email" | "push" | "inApp"
  ) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, [channel]: !cat[channel] } : cat
      )
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Notificacao</CardTitle>
          <CardDescription>
            Escolha como e quando voce deseja ser notificado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 gap-y-1 text-sm">
            <div />
            <span className="text-xs font-medium text-muted-foreground text-center">
              E-mail
            </span>
            <span className="text-xs font-medium text-muted-foreground text-center">
              Push
            </span>
            <span className="text-xs font-medium text-muted-foreground text-center">
              In-app
            </span>

            {categories.map((category, index) => (
              <div key={category.id} className="contents">
                {index > 0 && (
                  <div className="col-span-4">
                    <Separator />
                  </div>
                )}
                <div className="flex items-center gap-3 py-3">
                  <category.icon className="size-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">{category.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center py-3">
                  <Switch
                    checked={category.email}
                    onCheckedChange={() =>
                      toggleNotification(category.id, "email")
                    }
                    aria-label={`${category.title} por e-mail`}
                  />
                </div>
                <div className="flex justify-center py-3">
                  <Switch
                    checked={category.push}
                    onCheckedChange={() =>
                      toggleNotification(category.id, "push")
                    }
                    aria-label={`${category.title} por push`}
                  />
                </div>
                <div className="flex justify-center py-3">
                  <Switch
                    checked={category.inApp}
                    onCheckedChange={() =>
                      toggleNotification(category.id, "inApp")
                    }
                    aria-label={`${category.title} in-app`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo por E-mail</CardTitle>
          <CardDescription>
            Receba um resumo das suas atividades por e-mail.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Frequencia do resumo</Label>
              <p className="text-xs text-muted-foreground">
                Com que frequencia deseja receber o digest.
              </p>
            </div>
            <Select
              value={digestFrequency}
              onValueChange={setDigestFrequency}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Tempo real</SelectItem>
                <SelectItem value="daily">Diario</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="never">Desativado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 size-4" />
              Salvar preferencias
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
