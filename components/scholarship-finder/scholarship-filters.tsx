"use client"

import { SlidersHorizontal } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { filterGroups } from "./scholarship-data"

interface ScholarshipFiltersProps {
  selected: Record<string, string[]>
  onToggle: (groupId: string, option: string) => void
  onClear: () => void
}

export function ScholarshipFilters({
  selected,
  onToggle,
  onClear,
}: ScholarshipFiltersProps) {
  const totalSelected = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0,
  )

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="inline-flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="size-4 text-primary" />
          Filtros
        </h3>
        {totalSelected > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={onClear}
          >
            Limpar ({totalSelected})
          </Button>
        )}
      </div>

      <Accordion type="multiple" className="w-full">
        {filterGroups.map((group) => (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="text-sm">
              {group.label}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2.5 pt-1">
                {group.options.map((option) => {
                  const id = `${group.id}-${option}`
                  const checked = selected[group.id]?.includes(option) ?? false
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={() => onToggle(group.id, option)}
                      />
                      <Label
                        htmlFor={id}
                        className="text-sm font-normal text-muted-foreground"
                      >
                        {option}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
