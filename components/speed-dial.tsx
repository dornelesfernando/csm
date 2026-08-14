"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  FilePen,
  ListChecks,
  Timer,
  Bot,
  CalendarDays,
  X,
} from "lucide-react"

type Action = {
  label: string
  icon: typeof Plus
  href?: string
  accent: string
}

const actions: Action[] = [
  {
    label: "Criar novo registro",
    icon: FilePen,
    href: "/memoria",
    accent: "bg-blue-500 text-white",
  },
  {
    label: "Adicionar tarefa",
    icon: ListChecks,
    accent: "bg-emerald-500 text-white",
  },
  {
    label: "Iniciar Pomodoro",
    icon: Timer,
    accent: "bg-amber-500 text-white",
  },
  {
    label: "Assistente Academico",
    icon: Bot,
    href: "/assistente",
    accent: "bg-violet-500 text-white",
  },
  {
    label: "Abrir agenda",
    icon: CalendarDays,
    href: "/timeline/calendario",
    accent: "bg-primary text-primary-foreground",
  },
]

export function SpeedDial() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Overlay para fechar ao clicar fora */}
      {open && (
        <button
          type="button"
          aria-label="Fechar acoes rapidas"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-background/40 backdrop-blur-[1px]"
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Acoes expandidas */}
        <div className="flex flex-col items-end gap-3">
          {actions.map((action, index) => {
            const content = (
              <div
                className={`flex items-center gap-3 transition-all duration-300 ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: open
                    ? `${index * 40}ms`
                    : `${(actions.length - index) * 30}ms`,
                }}
              >
                <span className="rounded-md bg-card px-2.5 py-1 text-xs font-medium shadow-sm ring-1 ring-border">
                  {action.label}
                </span>
                <span
                  className={`flex size-11 items-center justify-center rounded-full shadow-md transition-transform hover:scale-105 ${action.accent}`}
                >
                  <action.icon className="size-5" />
                </span>
              </div>
            )

            return action.href ? (
              <Link
                key={action.label}
                href={action.href}
                onClick={() => setOpen(false)}
                aria-label={action.label}
              >
                {content}
              </Link>
            ) : (
              <button
                key={action.label}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={action.label}
              >
                {content}
              </button>
            )
          })}
        </div>

        {/* FAB principal */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar acoes rapidas" : "Abrir acoes rapidas"}
          aria-expanded={open}
          className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20 transition-transform hover:scale-105 active:scale-95"
        >
          <Plus
            className={`size-6 transition-transform duration-300 ${
              open ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </>
  )
}
