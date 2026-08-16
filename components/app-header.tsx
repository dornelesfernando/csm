"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bell, Search, Monitor, Newspaper, Building2 } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import Link from "next/link"

const routeLabels: Record<string, string> = {
  "/": "Painel",
  "/timeline": "Linha do Tempo",
  "/timeline/calendario": "Calendario",
  "/memoria": "Memoria Academica",
  "/competencias": "Competencias",
  "/toolkit": "Academic Toolkit",
  "/toolkit/linkedin-impact-builder": "LinkedIn Impact Builder",
  "/assistente": "Assistente Academico",
  "/configuracoes": "Configuracoes",
  "/notificacoes": "Notificacoes",
  "/usuarios": "Gestão de Usuários",
  "/centros-predios": "Centros e Prédios",
}

const SEARCH_TELAS = [
  { id: "tv-01", nome: "Hall Principal", local: "Entrada do CCT - Térreo" },
  { id: "tv-02", nome: "Corredor Laboratórios", local: "Bloco B - 2º andar" },
  { id: "tv-03", nome: "Saguão Biblioteca", local: "Biblioteca Central - Entrada" },
  { id: "tv-04", nome: "Recepção Saúde", local: "CCS - Hall de entrada" },
  { id: "tv-05", nome: "Átrio Humanas", local: "CCH - Convivência" },
  { id: "tv-06", nome: "Restaurante Universitário", local: "RU - Fila principal" },
]

const SEARCH_CONTEUDOS = [
  { id: "c-001", nome: "Semana Acadêmica de Computação 2026" },
  { id: "c-002", nome: "Novo horário de funcionamento da Biblioteca Central" },
  { id: "c-003", nome: "Manutenção elétrica programada no Bloco B" },
  { id: "c-007", nome: "Feira de Estágios e Carreiras" },
  { id: "c-009", nome: "Campanha de vacinação no campus" },
]

const SEARCH_CENTROS = [
  { id: "ct", nome: "Centro de Tecnologia" },
  { id: "ccne", nome: "Centro de Ciências Naturais e Exatas" },
  { id: "ccs", nome: "Centro de Ciências da Saúde" },
  { id: "cch", nome: "Centro de Ciências Humanas" },
]

export function AppHeader() {
  const pathname = usePathname()
  const [commandOpen, setCommandOpen] = useState(false)
  const isTaskDetail = pathname.startsWith("/tarefas/") && pathname !== "/tarefas"
  const currentLabel = isTaskDetail
    ? pathname.split("/").pop() || "Detalhes"
    : routeLabels[pathname] || "Pagina"

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <span className="text-muted-foreground">Academic Companion</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {isTaskDetail && (
            <>
              <BreadcrumbItem>
                <Link href="/tarefas" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tarefas
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-3">
        {/* Command palette trigger */}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="relative hidden items-center md:flex"
        >
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <span className="flex h-8 w-56 items-center rounded-md border border-input bg-background pl-8 pr-2 text-sm text-muted-foreground transition-colors hover:bg-accent">
            Buscar telas, conteúdos ou centros...
            <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </span>
        </button>

        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 md:hidden"
          onClick={() => setCommandOpen(true)}
        >
          <Search className="size-4" />
          <span className="sr-only">Buscar</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative h-8 w-8" asChild>
          <Link href="/notificacoes">
            <Bell className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              3
            </span>
            <span className="sr-only">Notificacoes</span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="size-8">
                <AvatarImage src="/placeholder.svg" alt="Laura Mendes" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  LM
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" sideOffset={4}>
            <div className="flex items-center gap-2 p-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  LM
                </AvatarFallback>
              </Avatar>
              <div className="grid text-sm leading-tight">
                <span className="font-medium">Laura Mendes</span>
                <span className="text-xs text-muted-foreground">
                  laura.mendes@uni.edu
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/configuracoes">Perfil e Conta</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Ajuda</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Buscar telas, conteúdos ou centros..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Telas">
            {SEARCH_TELAS.map((tela) => (
              <CommandItem key={tela.id} asChild>
                <Link href="/murais/telas">
                  <Monitor className="mr-2 size-4 text-muted-foreground" />
                  <span className="flex-1">{tela.nome}</span>
                  <span className="text-xs text-muted-foreground">{tela.local}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Conteúdos">
            {SEARCH_CONTEUDOS.map((conteudo) => (
              <CommandItem key={conteudo.id} asChild>
                <Link href="/murais/conteudos">
                  <Newspaper className="mr-2 size-4 text-muted-foreground" />
                  {conteudo.nome}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Centros">
            {SEARCH_CENTROS.map((centro) => (
              <CommandItem key={centro.id} asChild>
                <Link href="/centros-predios">
                  <Building2 className="mr-2 size-4 text-muted-foreground" />
                  {centro.nome}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  )
}
