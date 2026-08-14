"use client"

import { useState } from "react"
import {
  Sparkles,
  Copy,
  RefreshCw,
  ImageIcon,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Check,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const generatedPost = `Acabei de concluir uma etapa importante do Nexus SM 🚀

Finalizei a modelagem completa do banco em PostgreSQL e a API em Node.js + TypeScript. Depois de revisar os indices B-Tree e otimizar as queries mais pesadas, conseguimos reduzir a latencia media em 40%.

Tres aprendizados que levo dessa fase:

→ Modelar o dado antes de escrever a primeira query economiza semanas
→ Indice nao e bala de prata: medir antes e depois e essencial
→ TypeScript no backend salva o time de bugs silenciosos

Seguimos construindo. Proximo passo: camada de cache e observabilidade.

#NodeJS #PostgreSQL #SoftwareEngineering #TypeScript #BackendDevelopment`

export function PostGenerator() {
  const [tone, setTone] = useState("tecnico")
  const [copied, setCopied] = useState(false)
  const [context, setContext] = useState(
    "Terminei a modelagem do banco PostgreSQL e a API em Node.js para o projeto Nexus SM. Reduziu o tempo de query em 40%.",
  )

  function copyText() {
    navigator.clipboard?.writeText(generatedPost)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Coluna esquerda: configuracao */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Configuracao da publicacao</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="source">Origem dos dados</Label>
            <Select defaultValue="memoria">
              <SelectTrigger id="source">
                <SelectValue placeholder="Selecione a origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="memoria">
                  Importar da Memoria Academica
                </SelectItem>
                <SelectItem value="github">Repositorio do Github</SelectItem>
                <SelectItem value="evento">Evento / Hackathon</SelectItem>
                <SelectItem value="manual">Entrada Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="context">Contexto bruto</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={5}
              className="resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tom de voz</Label>
            <ToggleGroup
              type="single"
              value={tone}
              onValueChange={(v) => v && setTone(v)}
              className="justify-start gap-2"
            >
              <ToggleGroupItem value="tecnico" className="flex-1">
                Tecnico
              </ToggleGroupItem>
              <ToggleGroupItem value="storytelling" className="flex-1">
                Storytelling
              </ToggleGroupItem>
              <ToggleGroupItem value="executivo" className="flex-1">
                Executivo
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Button className="mt-1 gap-2">
            <Sparkles className="size-4" />
            Gerar publicacao de alto impacto
          </Button>
        </CardContent>
      </Card>

      {/* Coluna direita: preview do post */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
          <CardTitle className="text-base">Preview no LinkedIn</CardTitle>
          <Badge variant="secondary" className="gap-1 font-normal">
            <Sparkles className="size-3" />
            Gerado por IA
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-background">
            {/* Cabecalho do post */}
            <div className="flex items-center gap-3 p-4">
              <Avatar className="size-12">
                <AvatarImage src="/images/avatar-laura.png" alt="Laura Mendes" />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold leading-tight">Laura Mendes</p>
                <p className="truncate text-xs text-muted-foreground">
                  Software Engineering Student | Node.js
                </p>
                <p className="text-xs text-muted-foreground">Agora · 🌎</p>
              </div>
            </div>

            {/* Corpo do post */}
            <p className="whitespace-pre-line px-4 pb-3 text-sm leading-relaxed">
              {generatedPost}
            </p>

            {/* Anexo simulado */}
            <div className="px-4 pb-3">
              <div className="flex h-32 flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border text-muted-foreground">
                <ImageIcon className="size-6" />
                <span className="text-xs">
                  Anexo: imagem ou link do repositorio
                </span>
              </div>
            </div>

            <Separator />

            {/* Acoes sociais simuladas */}
            <div className="flex items-center justify-around px-2 py-1.5 text-muted-foreground">
              {[
                { icon: ThumbsUp, label: "Gostei" },
                { icon: MessageSquare, label: "Comentar" },
                { icon: Repeat2, label: "Compartilhar" },
                { icon: Send, label: "Enviar" },
              ].map((a) => (
                <span
                  key={a.label}
                  className="flex items-center gap-1.5 rounded px-2 py-1 text-xs"
                >
                  <a.icon className="size-4" />
                  {a.label}
                </span>
              ))}
            </div>
          </div>

          {/* Rodape de acoes */}
          <div className="mt-4 flex gap-2">
            <Button onClick={copyText} className="flex-1 gap-2">
              {copied ? (
                <>
                  <Check className="size-4" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copiar texto
                </>
              )}
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <RefreshCw className="size-4" />
              Regerar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
