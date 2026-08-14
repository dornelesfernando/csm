"use client"

import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
}

export function AppHeader() {
  const pathname = usePathname()
  const isTaskDetail = pathname.startsWith("/tarefas/") && pathname !== "/tarefas"
  const currentLabel = isTaskDetail
    ? pathname.split("/").pop() || "Detalhes"
    : routeLabels[pathname] || "Pagina"

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
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar na sua jornada..."
            className="h-8 w-56 bg-background pl-8 text-sm"
          />
        </div>

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
    </header>
  )
}
