"use client"

import { useState } from "react"
import { Lightbulb, Search, ThumbsUp, MessageSquare, MoveHorizontal as MoreHorizontal, Sparkles, TrendingUp, ArrowUpRight, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NovaIdeiaDialog } from "@/components/forms/nova-ideia-dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type IdeaStatus = "new" | "under_review" | "approved" | "in_progress" | "archived"
type IdeaCategory = "feature" | "improvement" | "research" | "experiment" | "automation"

interface Idea {
  id: string
  title: string
  description: string
  author: { name: string; initials: string }
  status: IdeaStatus
  category: IdeaCategory
  votes: number
  comments: number
  createdAt: string
  tags: string[]
  isBookmarked: boolean
}

const ideas: Idea[] = [
  { id: "IDEA-42", title: "Implementar IA para sugestao de tasks", description: "Usar LLM para analisar o backlog e sugerir priorizacao automatica de tarefas baseado em dependencias e deadlines.", author: { name: "Fernando D.", initials: "FD" }, status: "approved", category: "feature", votes: 18, comments: 7, createdAt: "08/02/2026", tags: ["AI", "Produtividade"], isBookmarked: true },
  { id: "IDEA-41", title: "Dashboard de metricas por squad", description: "Painel centralizado com velocity, burndown chart, e metricas de qualidade por squad.", author: { name: "Maria S.", initials: "MS" }, status: "in_progress", category: "feature", votes: 14, comments: 5, createdAt: "07/02/2026", tags: ["Analytics", "Dashboard"], isBookmarked: false },
  { id: "IDEA-40", title: "Automatizar deploy com feature flags", description: "Integrar feature flags no pipeline de CI/CD para releases mais seguros e graduais.", author: { name: "Carlos R.", initials: "CR" }, status: "under_review", category: "automation", votes: 12, comments: 3, createdAt: "06/02/2026", tags: ["DevOps", "CI/CD"], isBookmarked: true },
  { id: "IDEA-39", title: "Gamificacao do tracking de horas", description: "Sistema de pontos e conquistas para incentivar o registro de horas e completar tarefas no prazo.", author: { name: "Julia M.", initials: "JM" }, status: "new", category: "experiment", votes: 22, comments: 12, createdAt: "05/02/2026", tags: ["UX", "Engagement"], isBookmarked: false },
  { id: "IDEA-38", title: "Pesquisa: adotar GraphQL na API", description: "Investigar beneficios de migrar endpoints REST para GraphQL, especialmente para o app mobile.", author: { name: "Ana L.", initials: "AL" }, status: "under_review", category: "research", votes: 9, comments: 6, createdAt: "04/02/2026", tags: ["Backend", "Research"], isBookmarked: false },
  { id: "IDEA-37", title: "Melhorar acessibilidade em todos os modulos", description: "Audit completo de acessibilidade (WCAG 2.1 AA) e plano de correcao para todos os modulos.", author: { name: "Fernando D.", initials: "FD" }, status: "approved", category: "improvement", votes: 16, comments: 4, createdAt: "03/02/2026", tags: ["A11y", "Frontend"], isBookmarked: true },
  { id: "IDEA-36", title: "Bot Slack para notificacoes de incidentes", description: "Criar bot que notifica automaticamente o canal da squad quando um incidente critico e aberto.", author: { name: "Carlos R.", initials: "CR" }, status: "in_progress", category: "automation", votes: 11, comments: 2, createdAt: "02/02/2026", tags: ["DevOps", "Integracao"], isBookmarked: false },
  { id: "IDEA-35", title: "Modo escuro otimizado para daltonicos", description: "Adaptar paleta de cores do tema escuro para melhor visibilidade por usuarios daltonicos.", author: { name: "Julia M.", initials: "JM" }, status: "new", category: "improvement", votes: 8, comments: 1, createdAt: "01/02/2026", tags: ["A11y", "Design"], isBookmarked: false },
]

const statusConfig: Record<IdeaStatus, { label: string; color: string }> = {
  new: { label: "Nova", color: "bg-blue-500/10 text-blue-600" },
  under_review: { label: "Em Analise", color: "bg-amber-500/10 text-amber-600" },
  approved: { label: "Aprovada", color: "bg-emerald-500/10 text-emerald-600" },
  in_progress: { label: "Em Progresso", color: "bg-violet-500/10 text-violet-600" },
  archived: { label: "Arquivada", color: "bg-slate-500/10 text-slate-600" },
}

const categoryConfig: Record<IdeaCategory, { label: string; color: string }> = {
  feature: { label: "Feature", color: "bg-blue-500/10 text-blue-600" },
  improvement: { label: "Melhoria", color: "bg-emerald-500/10 text-emerald-600" },
  research: { label: "Pesquisa", color: "bg-cyan-500/10 text-cyan-600" },
  experiment: { label: "Experimento", color: "bg-pink-500/10 text-pink-600" },
  automation: { label: "Automacao", color: "bg-amber-500/10 text-amber-600" },
}

export default function IdeiasPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("votes")

  const filtered = ideas
    .filter((idea) => {
      const matchesSearch = idea.title.toLowerCase().includes(search.toLowerCase()) || idea.description.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || idea.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "votes") return b.votes - a.votes
      if (sortBy === "recent") return 0
      if (sortBy === "comments") return b.comments - a.comments
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banco de Ideias</h1>
          <p className="text-sm text-muted-foreground">Proponha, vote e acompanhe ideias da squad</p>
        </div>
        <NovaIdeiaDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Ideias</CardTitle>
            <Lightbulb className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ideas.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aprovadas</CardTitle>
            <Sparkles className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ideas.filter((i) => i.status === "approved").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Progresso</CardTitle>
            <TrendingUp className="size-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ideas.filter((i) => i.status === "in_progress").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Votos</CardTitle>
            <ThumbsUp className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ideas.reduce((acc, i) => acc + i.votes, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar ideias..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="new">Novas</SelectItem>
            <SelectItem value="under_review">Em Analise</SelectItem>
            <SelectItem value="approved">Aprovadas</SelectItem>
            <SelectItem value="in_progress">Em Progresso</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Ordenar" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="votes">Mais Votadas</SelectItem>
            <SelectItem value="recent">Mais Recentes</SelectItem>
            <SelectItem value="comments">Mais Comentadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((idea) => (
          <Card key={idea.id} className="group transition-all hover:shadow-md hover:border-primary/30">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{idea.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">{idea.author.name}</p>
                    <p className="text-[10px] text-muted-foreground">{idea.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-7">
                    <Bookmark className={`size-3.5 ${idea.isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><ArrowUpRight className="mr-2 size-4" />Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">{idea.id}</span>
                  <Badge variant="secondary" className={`text-[10px] border-0 ${statusConfig[idea.status].color}`}>
                    {statusConfig[idea.status].label}
                  </Badge>
                  <Badge variant="secondary" className={`text-[10px] border-0 ${categoryConfig[idea.category].color}`}>
                    {categoryConfig[idea.category].label}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold leading-snug">{idea.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{idea.description}</p>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {idea.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 h-4">{tag}</Badge>
                ))}
              </div>

              <Separator className="mb-3" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
                    <ThumbsUp className="size-3" />
                    <span className="font-semibold">{idea.votes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
                    <MessageSquare className="size-3" />
                    <span>{idea.comments}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
