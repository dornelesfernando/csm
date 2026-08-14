import Link from "next/link"
import { Pin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { tools } from "./toolkit-data"

// Acesso Rapido: mini-cards horizontais para as ferramentas fixadas (pinned).
export function QuickAccess() {
  const pinned = tools.filter((t) => t.pinned)

  if (pinned.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Pin className="size-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Acesso Rapido
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pinned.map((tool) => {
          const available = tool.status === "disponivel"
          const Icon = tool.icon
          return (
            <Link
              key={tool.id}
              href={`/toolkit/${tool.id}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg",
                  available
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">
                  {tool.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {available ? "Disponivel" : "Em breve"}
                </span>
              </div>
              <Pin className="size-4 shrink-0 rotate-45 fill-primary text-primary" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
