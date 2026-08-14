"use client"

import { useState } from "react"
import { Camera, Save } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProfileForm() {
  const [formData, setFormData] = useState({
    nome: "Fernando Dorneles",
    email: "fernando@dorneles.dev",
    telefone: "+55 51 99999-0000",
    cargo: "Engenheiro Full Stack",
    departamento: "engineering",
    bio: "Engenheiro Full Stack apaixonado por soluções escaláveis e experiências de usuário excepcionais. Trabalhando com React, Node.js e arquitetura cloud.",
    localizacao: "Porto Alegre, RS",
    linkedin: "linkedin.com/in/fernandodorneles",
    github: "github.com/fernandodorneles",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informacoes Pessoais</CardTitle>
        <CardDescription>
          Atualize suas informacoes pessoais e de contato.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="size-20">
              <AvatarImage src="/placeholder.svg" alt="Fernando Dorneles" />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                FD
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105"
              aria-label="Alterar foto de perfil"
            >
              <Camera className="size-3.5" />
            </button>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{formData.nome}</p>
            <p className="text-sm text-muted-foreground">{formData.cargo}</p>
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: JPG, PNG. Tamanho maximo: 2MB.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Input
              id="cargo"
              value={formData.cargo}
              onChange={(e) =>
                setFormData({ ...formData, cargo: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select
              value={formData.departamento}
              onValueChange={(value) =>
                setFormData({ ...formData, departamento: value })
              }
            >
              <SelectTrigger id="departamento">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engenharia</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="product">Produto</SelectItem>
                <SelectItem value="operations">Operacoes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="localizacao">Localizacao</Label>
            <Input
              id="localizacao"
              value={formData.localizacao}
              onChange={(e) =>
                setFormData({ ...formData, localizacao: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={3}
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Breve descricao visivel para membros do time.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 size-4" />
            Salvar alteracoes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
