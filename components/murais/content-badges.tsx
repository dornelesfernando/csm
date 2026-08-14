import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  CONTENT_TYPES,
  CONTENT_STATUS,
  CENTROS,
  centroById,
  type ContentType,
  type ContentStatus,
} from "./murais-data"

export function TypeBadge({ type }: { type: ContentType }) {
  const t = CONTENT_TYPES[type]
  const Icon = t.icon
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span className={cn("flex size-6 items-center justify-center rounded-md", t.bg)}>
        <Icon className={cn("size-3.5", t.text)} />
      </span>
      {t.label}
    </span>
  )
}

export function StatusBadge({ status }: { status: ContentStatus }) {
  const s = CONTENT_STATUS[status]
  return (
    <Badge variant="outline" className={cn("gap-1.5 font-medium", s.className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {s.label}
    </Badge>
  )
}

export function TargetBadges({ alvo }: { alvo: string[] }) {
  const todos = alvo.length === CENTROS.length
  if (todos) {
    return (
      <Badge variant="secondary" className="font-medium">
        Todos os centros
      </Badge>
    )
  }

  const visiveis = alvo.slice(0, 2)
  const extra = alvo.length - visiveis.length

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visiveis.map((id) => {
        const c = centroById(id)
        if (!c) return null
        return (
          <span
            key={id}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-xs font-medium"
          >
            <span className={cn("size-2 rounded-full", c.cor)} />
            {c.sigla}
          </span>
        )
      })}
      {extra > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-default rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{extra}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {alvo
              .slice(2)
              .map((id) => centroById(id)?.sigla)
              .filter(Boolean)
              .join(", ")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
