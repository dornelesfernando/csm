"use client"

import { User, Shield, Bell, Eye, Palette } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/settings/profile-form"
import { SecurityForm } from "@/components/settings/security-form"
import { NotificationsForm } from "@/components/settings/notifications-form"
import { PrivacyForm } from "@/components/settings/privacy-form"
import { AppearanceForm } from "@/components/settings/appearance-form"

const settingsTabs = [
  { value: "perfil", label: "Perfil", icon: User },
  { value: "seguranca", label: "Seguranca", icon: Shield },
  { value: "notificacoes", label: "Notificacoes", icon: Bell },
  { value: "privacidade", label: "Privacidade", icon: Eye },
  { value: "aparencia", label: "Aparencia", icon: Palette },
]

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuracoes</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie seu perfil, seguranca e preferencias da conta.
        </p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="gap-2 rounded-lg border border-transparent px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <tab.icon className="size-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="perfil">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="seguranca">
          <SecurityForm />
        </TabsContent>
        <TabsContent value="notificacoes">
          <NotificationsForm />
        </TabsContent>
        <TabsContent value="privacidade">
          <PrivacyForm />
        </TabsContent>
        <TabsContent value="aparencia">
          <AppearanceForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
