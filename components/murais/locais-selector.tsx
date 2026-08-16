"use client"

import { useState, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import {
  CENTROS,
  PREDIOS,
  prediosByCentro,
  type Centro,
} from "./playlist-data"

interface LocaisSelectorProps {
  selected: string[]
  onChange: (predioIds: string[]) => void
  disabled?: boolean
}

export function LocaisSelector({ selected, onChange, disabled }: LocaisSelectorProps) {
  const [openCentros, setOpenCentros] = useState<Set<string>>(new Set())

  const toggleCentro = useCallback(
    (centroId: string) => {
      const predioIds = prediosByCentro(centroId).map((p) => p.id)
      const allSelected = predioIds.every((id) => selected.includes(id))
      if (allSelected) {
        onChange(selected.filter((id) => !predioIds.includes(id)))
      } else {
        const next = [...selected]
        predioIds.forEach((id) => {
          if (!next.includes(id)) next.push(id)
        })
        onChange(next)
      }
    },
    [selected, onChange],
  )

  const togglePredio = useCallback(
    (predioId: string) => {
      if (selected.includes(predioId)) {
        onChange(selected.filter((id) => id !== predioId))
      } else {
        onChange([...selected, predioId])
      }
    },
    [selected, onChange],
  )

  const toggleOpen = (centroId: string) => {
    setOpenCentros((prev) => {
      const next = new Set(prev)
      if (next.has(centroId)) next.delete(centroId)
      else next.add(centroId)
      return next
    })
  }

  const getCentroState = (centro: Centro): boolean | "indeterminate" => {
    const predioIds = prediosByCentro(centro.id).map((p) => p.id)
    const count = predioIds.filter((id) => selected.includes(id)).length
    if (count === 0) return false
    if (count === predioIds.length) return true
    return "indeterminate"
  }

  return (
    <div className="space-y-2">
      {CENTROS.map((centro) => {
        const predios = prediosByCentro(centro.id)
        const centroState = getCentroState(centro)
        const isOpen = openCentros.has(centro.id)
        const selectedCount = predios.filter((p) =>
          selected.includes(p.id),
        ).length

        return (
          <div key={centro.id} className="rounded-lg border border-border">
            <div className="flex items-center gap-3 p-3">
              <Checkbox
                checked={centroState}
                disabled={disabled}
                onCheckedChange={() => toggleCentro(centro.id)}
                id={`centro-${centro.id}`}
              />
              <button
                type="button"
                onClick={() => !disabled && toggleOpen(centro.id)}
                className="flex flex-1 items-center justify-between gap-2 text-left"
              >
                <Label
                  htmlFor={`centro-${centro.id}`}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className={cn("size-2.5 rounded-full", centro.cor)} />
                  {centro.nome}
                </Label>
                <div className="flex items-center gap-2">
                  {selectedCount > 0 && (
                    <Badge variant="secondary" className="text-[10px]">
                      {selectedCount}/{predios.length}
                    </Badge>
                  )}
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </div>
              </button>
            </div>

            <Collapsible open={isOpen}>
              <CollapsibleContent>
                <div className="border-t border-border p-3 pl-10">
                  <div className="space-y-2.5">
                    {predios.map((predio) => (
                      <div key={predio.id} className="flex items-center gap-3">
                        <Checkbox
                          checked={selected.includes(predio.id)}
                          disabled={disabled}
                          onCheckedChange={() => togglePredio(predio.id)}
                          id={`predio-${predio.id}`}
                        />
                        <Label
                          htmlFor={`predio-${predio.id}`}
                          className="cursor-pointer text-sm text-muted-foreground"
                        >
                          {predio.nome}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )
      })}
    </div>
  )
}

export function LocaisBadges({ selected }: { selected: string[] }) {
  if (selected.length === 0) {
    return (
      <span className="text-xs text-muted-foreground">
        Nenhum local selecionado
      </span>
    )
  }

  const allSelected = PREDIOS.every((p) => selected.includes(p.id))
  if (allSelected) {
    return <Badge variant="secondary">Todos os locais</Badge>
  }

  const visible = selected.slice(0, 3)
  const extra = selected.length - visible.length

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((id) => {
        const predio = PREDIOS.find((p) => p.id === id)
        if (!predio) return null
        const centro = CENTROS.find((c) => c.id === predio.centroId)
        return (
          <span
            key={id}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-xs font-medium"
          >
            {centro && (
              <span className={cn("size-1.5 rounded-full", centro.cor)} />
            )}
            {predio.nome}
          </span>
        )
      })}
      {extra > 0 && (
        <span className="text-xs font-medium text-muted-foreground">
          +{extra}
        </span>
      )}
    </div>
  )
}
