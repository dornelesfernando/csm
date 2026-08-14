import { Mic, ImageIcon, Type, Quote, Play } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type Memory, typeMeta } from "./memory-data"

const formatIcon = {
  texto: Type,
  audio: Mic,
  imagem: ImageIcon,
}

export function MemoryCard({ memory }: { memory: Memory }) {
  const meta = typeMeta(memory.type)
  const FormatIcon = formatIcon[memory.format]

  return (
    <article className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={cn("flex size-7 items-center justify-center rounded-lg", meta.color)}>
            <FormatIcon className="size-3.5" />
          </span>
          <Badge variant="secondary" className="text-[10px]">
            {memory.type}
          </Badge>
        </div>
        <span className="text-[10px] text-muted-foreground">{memory.date}</span>
      </div>

      {memory.format === "audio" ? (
        <div className="flex items-center gap-3 rounded-lg bg-muted/40 p-3">
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Reproduzir audio"
          >
            <Play className="size-4" />
          </button>
          <div className="flex flex-1 items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="w-0.5 rounded-full bg-primary/40"
                style={{ height: `${8 + Math.abs(Math.sin(i * 1.7)) * 18}px` }}
              />
            ))}
          </div>
          <span className="text-[11px] tabular-nums text-muted-foreground">{memory.durationLabel}</span>
        </div>
      ) : null}

      <div className="flex flex-1 gap-2">
        <Quote className="size-4 shrink-0 text-primary/30" />
        <p className="text-sm leading-relaxed text-pretty">{memory.text}</p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {memory.tags.map((tag) => (
          <span key={tag} className="text-[11px] font-medium text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  )
}
