"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, MonitorPlay, Tv } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { title: "Visao Geral", href: "/murais", icon: LayoutDashboard, exact: true },
  { title: "Conteudos", href: "/murais/conteudos", icon: FileText },
  { title: "Telas", href: "/murais/telas", icon: Tv },
]

export function MuraisNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegacao do CMS de Murais"
      className="flex items-center gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1"
    >
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <link.icon className="size-4" />
            {link.title}
          </Link>
        )
      })}
      <Link
        href="/player"
        target="_blank"
        className="ml-auto flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <MonitorPlay className="size-4" />
        <span className="hidden sm:inline">Abrir Player</span>
      </Link>
    </nav>
  )
}
