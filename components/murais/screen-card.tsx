"use client"

import { useState } from "react"
import {
  MapPin,
  Wifi,
  WifiOff,
  RefreshCw,
  Copy,
  Settings,
  MonitorPlay,
  Clock,
  Monitor,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { centroById, type Tela, type ScreenStatus } from "./murais-data"
import { ScreenSettingsDialog } from "./screen-settings-dialog"

const statusMeta: Record<
  ScreenStatus,
  { label: string; dot: string; text: string; icon: typeof Wifi }
> = {
  online: {
    label: "Online",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: Wifi,
  },
  offline: {
    label: "Offline",
    dot: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    icon: WifiOff,
  },
  sincronizando: {
    label: "Sincronizando",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    icon: RefreshCw,
  },
}

export function ScreenCard({ tela }: { tela: Tela }) {
  const centro = centroById(tela.centro)
  const s = statusMeta[tela.status]
  const StatusIcon = s.icon
  const isOnline = tela.status !== "offline"
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <Card className="flex flex-col overflow-hidden bg-card transition-shadow hover:shadow-md">
      {/* Preview */}
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-muted to-muted/40">
        <Monitor
          className={cn(
            "size-10",
            isOnline ? "text-foreground/40" : "text-muted-foreground/30",
          )}
        />
        <span
          className={cn(
            "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-2 py-1 text-xs font-medium backdrop-blur",
            s.text,
          )}
        >
          <span className="relative flex size-2">
            {tela.status === "online" && (
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-500/60" />
            )}
            <span className={cn("relative inline-flex size-2 rounded-full", s.dot)} />
          </span>
          {s.label}
        </span>
        {centro && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-card/90 px-1.5 py-0.5 text-xs font-medium backdrop-blur">
            <span className={cn("size-2 rounded-full", centro.cor)} />
            {centro.sigla}
          </span>
        )}
      </div>

      <CardHeader className="pb-2">
        <h3 className="font-semibold leading-tight">{tela.nome}</h3>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          {tela.local}
        </p>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <dl className="grid grid-cols-2 gap-y-2 text-xs">
          <div>
            <dt className="text-muted-foreground">Endereco IP</dt>
            <dd className="font-mono font-medium">{tela.ip}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Resolucao</dt>
            <dd className="font-medium">{tela.resolucao}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Ativos</dt>
            <dd className="font-medium">{tela.conteudosAtivos} conteudos</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3" />
              Ultima sync
            </dt>
            <dd className="font-medium">{tela.ultimaSync}</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="gap-2 border-t border-border pt-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            const url = `https://murais.uni.edu/player/${tela.id}`
            if (navigator?.clipboard) navigator.clipboard.writeText(url)
            toast.success("URL do Player copiada", { description: url })
          }}
        >
          <Copy className="size-4" />
          Copiar URL
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="size-9" asChild>
              <a href="/player" target="_blank" rel="noreferrer">
                <MonitorPlay className="size-4" />
                <span className="sr-only">Abrir Player</span>
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Abrir Player</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="size-4" />
              <span className="sr-only">Configuracoes</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Configuracoes</TooltipContent>
        </Tooltip>
      </CardFooter>

      <ScreenSettingsDialog
        tela={tela}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </Card>
  )
}
