"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CreditCard as Edit, Share2, Archive, MessageSquare, Paperclip, Send, CircleCheck as CheckCircle2, Circle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

const subtasks = [
  { id: 1, title: "Criar schema de autenticacao", done: true },
  { id: 2, title: "Implementar middleware JWT", done: true },
  { id: 3, title: "Testes de integracao", done: true },
  { id: 4, title: "Revisar e documentar endpoints", done: false },
]

const attachments = [
  { name: "auth-flow-diagram.png", size: "1.2 MB", type: "image" },
  { name: "api-spec-v2.pdf", size: "340 KB", type: "pdf" },
]

const timeline = [
  { user: "Fernando D.", action: "mudou o status para Codificando", time: "2h atras", initials: "FD" },
  { user: "Maria S.", action: "comentou: 'Boa abordagem no middleware!'", time: "4h atras", initials: "MS" },
  { user: "Carlos R.", action: "anexou auth-flow-diagram.png", time: "1 dia atras", initials: "CR" },
  { user: "Fernando D.", action: "criou esta tarefa", time: "3 dias atras", initials: "FD" },
]

const chatMessages = [
  { user: "Maria S.", initials: "MS", message: "Fernando, a abordagem com JWT refresh tokens esta otima. So uma duvida sobre o tempo de expiracao.", time: "4h atras" },
  { user: "Fernando D.", initials: "FD", message: "Obrigado Maria! Estou usando 15min para access e 7 dias para refresh. O que acha?", time: "3h atras" },
  { user: "Carlos R.", initials: "CR", message: "Adicionei o diagrama do fluxo atualizado. Confere se esta alinhado com a implementacao.", time: "2h atras" },
]

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string }>
}) {
  const { taskId } = use(params)
  const completedSubtasks = subtasks.filter((s) => s.done).length
  const progressPercent = Math.round((completedSubtasks / subtasks.length) * 100)

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/tarefas"><ArrowLeft className="size-4" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{taskId}</span>
              <Badge className="bg-blue-500/10 text-blue-600 border-0 text-xs">Codificando</Badge>
              <Badge variant="outline" className="text-xs">Alta</Badge>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Refatorar modulo de autenticacao</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Edit className="mr-2 size-3" />Editar</Button>
          <Button variant="outline" size="sm"><Clock className="mr-2 size-3" />Registrar Tempo</Button>
          <Button variant="ghost" size="icon" className="size-8"><Share2 className="size-4" /></Button>
          <Button variant="ghost" size="icon" className="size-8"><Archive className="size-4" /></Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader><CardTitle className="text-base">Descricao</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Refatorar completamente o modulo de autenticacao do sistema, migrando de session-based auth para JWT com refresh tokens. Inclui a implementacao de middleware de verificacao, rate limiting nos endpoints de login, e integracao com o novo provedor OAuth2. O objetivo e melhorar a seguranca e permitir autenticacao cross-service na arquitetura de microservicos.
              </p>
            </CardContent>
          </Card>

          {/* Subtasks Checklist */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Checklist de Subtarefas</CardTitle>
                <span className="text-xs text-muted-foreground">{completedSubtasks} de {subtasks.length} - {progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2 [&>div]:bg-emerald-500" />
            </CardHeader>
            <CardContent className="space-y-2">
              {subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 rounded-md border p-3">
                  <Checkbox checked={sub.done} />
                  <span className={`text-sm ${sub.done ? "line-through text-muted-foreground" : ""}`}>{sub.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Anexos</CardTitle>
                <Button variant="ghost" size="sm"><Paperclip className="mr-2 size-3" />Adicionar</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {attachments.map((file) => (
                <div key={file.name} className="flex items-center gap-3 rounded-md border p-3">
                  <FileText className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* People */}
          <Card>
            <CardHeader><CardTitle className="text-base">Pessoas</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Responsavel</p>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8"><AvatarFallback className="bg-primary/10 text-primary text-xs">FD</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-medium">Fernando Dorneles</p>
                    <p className="text-xs text-muted-foreground">fernando@dorneles.dev</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Membros</p>
                <div className="flex -space-x-2">
                  {["MS", "CR", "AL"].map((initials) => (
                    <Avatar key={initials} className="size-8 border-2 border-card"><AvatarFallback className="bg-primary/10 text-primary text-[10px]">{initials}</AvatarFallback></Avatar>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Metrics */}
          <Card>
            <CardHeader><CardTitle className="text-base">Tempo</CardTitle></CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">27h 45m</p>
              <p className="text-xs text-muted-foreground mb-3">Tempo total investido</p>
              <div className="space-y-2">
                {[
                  { label: "Codificando", hours: "18h 30m", color: "bg-blue-500" },
                  { label: "Em Revisao", hours: "5h 15m", color: "bg-amber-500" },
                  { label: "Reunioes", hours: "4h 00m", color: "bg-violet-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${item.color}`} />
                      <span className="text-muted-foreground">{item.label}</span>
                    </div>
                    <span className="font-mono text-xs">{item.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity / Chat Tabs */}
          <Card>
            <Tabs defaultValue="activity">
              <CardHeader className="pb-0">
                <TabsList className="w-full">
                  <TabsTrigger value="activity" className="flex-1">Atividade</TabsTrigger>
                  <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-4">
                <TabsContent value="activity" className="mt-0">
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {timeline.map((event, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <Avatar className="size-6"><AvatarFallback className="bg-primary/10 text-primary text-[9px]">{event.initials}</AvatarFallback></Avatar>
                            {i < timeline.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm"><span className="font-medium">{event.user}</span>{" "}<span className="text-muted-foreground">{event.action}</span></p>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="chat" className="mt-0">
                  <ScrollArea className="h-52">
                    <div className="space-y-4">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className="flex gap-2">
                          <Avatar className="size-6 shrink-0"><AvatarFallback className="bg-primary/10 text-primary text-[9px]">{msg.initials}</AvatarFallback></Avatar>
                          <div className="rounded-lg bg-muted p-2.5 text-sm">
                            <p className="font-medium text-xs mb-0.5">{msg.user}</p>
                            <p className="text-muted-foreground text-xs">{msg.message}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="mt-3 flex items-center gap-2">
                    <Input placeholder="Escreva uma mensagem..." className="h-8 text-xs" />
                    <Button size="icon" className="size-8 shrink-0"><Send className="size-3" /></Button>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
