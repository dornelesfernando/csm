"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GitBranch,
  CalendarDays,
  BookMarked,
  Sparkles,
  Bot,
  Wrench,
  Settings,
  ChevronDown,
  ChevronsUpDown,
  Plus,
  Sun,
  Moon,
  Monitor,
  GraduationCap,
  FileText,
  Award,
  Focus,
  Pin,
  MonitorPlay,
  Newspaper,
  Tv,
  PlaySquare,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const personalNav = [
  { title: "Painel", href: "/", icon: LayoutDashboard },
  {
    title: "Linha do Tempo",
    href: "/timeline",
    icon: GitBranch,
    children: [
      { title: "Calendario", href: "/timeline/calendario", icon: CalendarDays },
    ],
  },
  { title: "Memoria Academica", href: "/memoria", icon: BookMarked },
  { title: "Competencias", href: "/competencias", icon: Sparkles },
  { title: "Academic Toolkit", href: "/toolkit", icon: Wrench },
  { title: "Assistente Academico", href: "/assistente", icon: Bot },
]

// CMS de Murais Digitais
const muraisNav = [
  { title: "Dashboard", href: "/murais", icon: MonitorPlay },
  { title: "Conteudos", href: "/murais/conteudos", icon: Newspaper },
  { title: "Telas", href: "/murais/telas", icon: Tv },
]

// Ferramentas favoritadas pelo usuario no Academic Toolkit
const pinnedTools = [
  { title: "Resume Builder", href: "/toolkit/resume-builder", icon: FileText },
  { title: "Lattes Assistant", href: "/toolkit/lattes-assistant", icon: Award },
  {
    title: "Deep Work Optimizer",
    href: "/toolkit/deep-work-optimizer",
    icon: Focus,
  },
]

const cursos = [
  { name: "Ciencia da Computacao", color: "bg-blue-500" },
  { name: "Engenharia de Software", color: "bg-emerald-500" },
  { name: "Sistemas de Informacao", color: "bg-amber-500" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <GraduationCap className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Academic Companion
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Ciencia da Computacao
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel>Cursos</DropdownMenuLabel>
                {cursos.map((curso) => (
                  <DropdownMenuItem key={curso.name}>
                    <div
                      className={`mr-2 size-4 rounded ${curso.color}`}
                    />
                    {curso.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus className="mr-2 size-4" />
                  Adicionar curso
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupLabel>Minha Jornada</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personalNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.children && (
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.href}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === child.href}
                          >
                            <Link href={child.href}>
                              <child.icon className="size-4" />
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* CMS de Murais Digitais do campus */}
        <SidebarGroup className="border-t border-sidebar-border">
          <SidebarGroupLabel>Murais Digitais</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {muraisNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/murais"
                        ? pathname === "/murais"
                        : pathname.startsWith(item.href)
                    }
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-sidebar-foreground/80"
                >
                  <Link href="/player" target="_blank" rel="noopener noreferrer">
                    <PlaySquare className="size-4" />
                    <span>Abrir Player</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Acesso rapido as ferramentas favoritadas no Toolkit */}
        {/* <SidebarGroup className="border-t border-sidebar-border">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider">
            Ferramentas Fixadas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pinnedTools.map((tool) => (
                <SidebarMenuItem key={tool.href}>
                  <SidebarMenuButton
                    asChild
                    size="sm"
                    isActive={pathname === tool.href}
                    className="text-sidebar-foreground/80"
                  >
                    <Link href={tool.href}>
                      <tool.icon className="size-3.5" />
                      <span className="text-[13px]">{tool.title}</span>
                      <Pin className="ml-auto size-3 text-muted-foreground/50" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/configuracoes"}>
              <Link href="/configuracoes">
                <Settings className="size-4" />
                <span>Configuracoes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center gap-1 px-2 py-1">
              {(
                [
                  { value: "light", icon: Sun, label: "Tema claro" },
                  { value: "dark", icon: Moon, label: "Tema escuro" },
                  { value: "system", icon: Monitor, label: "Tema do sistema" },
                ] as const
              ).map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTheme(item.value)}
                  className={`rounded-md p-1.5 transition-colors ${
                    mounted && theme === item.value
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={item.label}
                >
                  <item.icon className="size-4" />
                </button>
              ))}
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      LM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Laura Mendes
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      laura.mendes@uni.edu
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                side="top"
                sideOffset={4}
              >
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
