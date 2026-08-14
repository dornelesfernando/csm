import { CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { calendarMarks, categoryMetaMap } from "./event-data"

const weekdayLabels = ["D", "S", "T", "Q", "Q", "S", "S"]

// Julho 2026 comeca em uma quarta-feira (indice 3).
const MONTH_LABEL = "Julho 2026"
const FIRST_WEEKDAY = 3
const DAYS_IN_MONTH = 31

const markByDay = new Map(calendarMarks.map((mark) => [mark.day, mark]))

export function EventCalendarWidget() {
  // Celulas vazias antes do primeiro dia + dias do mes.
  const cells: (number | null)[] = [
    ...Array.from({ length: FIRST_WEEKDAY }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <CalendarDays className="size-4 text-primary" />
          Agenda do mes
        </CardTitle>
        <p className="text-xs text-muted-foreground">{MONTH_LABEL}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdayLabels.map((label, i) => (
            <span
              key={i}
              className="py-1 text-[11px] font-medium text-muted-foreground"
            >
              {label}
            </span>
          ))}
          {cells.map((day, i) => {
            if (day === null) {
              return <span key={`empty-${i}`} className="aspect-square" />
            }
            const mark = markByDay.get(day)
            return (
              <div
                key={day}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-md text-xs",
                  mark
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {day}
                {mark && (
                  <span
                    className={cn(
                      "absolute bottom-1 size-1.5 rounded-full",
                      categoryMetaMap[mark.category].dot,
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-2 border-t border-border/60 pt-3">
          {calendarMarks.map((mark) => (
            <div
              key={mark.day}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  categoryMetaMap[mark.category].dot,
                )}
              />
              <span className="font-mono tabular-nums text-foreground/70">
                {String(mark.day).padStart(2, "0")}/07
              </span>
              <span>{mark.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
