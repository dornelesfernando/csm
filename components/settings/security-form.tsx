"use client"

import { useState } from "react"
import { Shield, Key, Smartphone, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const activeSessions = [
  {
    id: 1,
    device: "MacBook Pro - Chrome",
    location: "Porto Alegre, RS",
    lastActive: "Agora",
    current: true,
  },
  {
    id: 2,
    device: "iPhone 15 - Safari",
    location: "Porto Alegre, RS",
    lastActive: "2h atras",
    current: false,
  },
  {
    id: 3,
    device: "Windows PC - Firefox",
    location: "Sao Paulo, SP",
    lastActive: "3 dias atras",
    current: false,
  },
]

export function SecurityForm() {
  const [twoFactor, setTwoFactor] = useState(false)
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="size-5 text-primary" />
            <div>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Atualize sua senha para manter a conta segura.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha atual</Label>
            <Input
              id="current-password"
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              placeholder="Digite sua senha atual"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova senha</Label>
              <Input
                id="new-password"
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                placeholder="Minimo 8 caracteres"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar nova senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                placeholder="Repita a nova senha"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Atualizar senha</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            <div>
              <CardTitle>Autenticacao em Dois Fatores</CardTitle>
              <CardDescription>
                Adicione uma camada extra de seguranca a sua conta.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Aplicativo autenticador</p>
                <p className="text-xs text-muted-foreground">
                  Use Google Authenticator, Authy ou similar.
                </p>
              </div>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
          {twoFactor && (
            <p className="mt-3 text-xs text-emerald-600">
              2FA ativado. Voce sera solicitado a inserir o codigo ao fazer
              login.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LogOut className="size-5 text-primary" />
            <div>
              <CardTitle>Sessoes Ativas</CardTitle>
              <CardDescription>
                Gerencie os dispositivos conectados a sua conta.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.map((session, index) => (
            <div key={session.id}>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{session.device}</p>
                    {session.current && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-emerald-500/10 text-emerald-600 border-0"
                      >
                        Atual
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {session.location} &middot; {session.lastActive}
                  </p>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    Encerrar
                  </Button>
                )}
              </div>
              {index < activeSessions.length - 1 && <Separator />}
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive bg-transparent">
              Encerrar todas as outras sessoes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
