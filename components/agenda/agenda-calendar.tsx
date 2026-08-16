"use client"

import { useState } from "react"
import type { ComponentProps } from "react"
import { Calendar as CalendarIcon, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  blockStyles,
  getBlocksForWeekday,
  minutesFromStart,
  monthEventTypes,
  weekdayLabels,
  weekdayShort,
  type TimeBlock,
} from "@/components/agenda/agenda-data"

type DayProps = ComponentProps<typeof Calendar>["components"] extends infer T
  ? T extends { Day?: infer D }
    ? D extends React.ComponentType<infer P>
      ? P
      : never
    : never
  : never

function DayWithDots(props: DayProps) {
  const dayOfMonth = props.day.date.getDate()
  const isCurrentMonth =
    props.displayMonth &&
    props.day.date.getMonth() === props.displayMonth.getMonth()

  const types = isCurrentMonth
    ? monthEventTypes[dayOfMonth]
    : undefined

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <button
        type="button"
        className="flex size-full items-center justify-center"
        onClick={() => props.onClick?.(props.day.date)}
      >
        {props.day.date.getDate()}
      </button>

      {types && types.length > 0 && (
        <span className="pointer-events-none absolute bottom-0.5 left-1/2 flex -translate-x-1/2 -space-x-1">
          {types.slice(0, 4).map((type, i) => (
            <span
              key={i}
              className={`size-1.5 rounded-full border border-card ${blockStyles[type].dot}`}
            />
          ))}
        </span>
      )}
    </div>
  )
}

function BlockRow({ block }: { block: TimeBlock }) {
  const style = blockStyles[block.type]

  return (
    <div
      className={`flex items-start gap-3 rounded-md border-l-2 px-3 py-2 ${style.bar}`}
    >
      <div className="w-14 shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
        {block.start}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight">
          {block.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="tabular-nums">
            {block.start} - {block.end}
          </span>

          {block.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {block.location}
            </span>
          )}
        </div>
      </div>

      <Badge variant="secondary" className={`shrink-0 ${style.chip}`}>
        {style.label}
      </Badge>
    </div>
  )
}

// Visão diária: linha do tempo vertical de 7h às 22h
function DayView({ weekday }: { weekday: number }) {
  const blocks = getBlocksForWeekday(weekday)
  const dayStart = 7
  const hours = Array.from({ length: 16 }, (_, i) => dayStart + i)

  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
        <CalendarIcon className="size-8 opacity-50" />
        <p className="text-sm">
          Nenhum bloco para {weekdayLabels[weekday]}.
        </p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[460px] pr-3">
      <div className="relative">
        {hours.map((h) => (
          <div key={h} className="flex h-16 items-start gap-3">
            <span className="w-12 shrink-0 pt-1 text-xs tabular-nums text-muted-foreground">
              {String(h).padStart(2, "0")}:00
            </span>

            <div className="flex-1 border-t border-border" />
          </div>
        ))}

        <div className="absolute inset-y-0 left-[60px] right-0">
          {blocks.map((block) => {
            const top =
              (minutesFromStart(block.start, dayStart) / 60) * 64

            const height =
              ((minutesFromStart(block.end, dayStart) -
                minutesFromStart(block.start, dayStart)) /
                60) *
              64

            const style = blockStyles[block.type]

            return (
              <div
                key={block.id}
                className={`absolute left-0 right-2 overflow-hidden rounded-md border-l-2 px-3 py-1.5 ${style.bar}`}
                style={{
                  top,
                  height: Math.max(height, 28),
                }}
              >
                <p className="truncate text-xs font-semibold leading-tight">
                  {block.title}
                </p>

                <p className="truncate text-[11px] text-muted-foreground">
                  {block.start} - {block.end}
                  {block.location ? ` - ${block.location}` : ""}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </ScrollArea>
  )
}

// Visão semanal: colunas de segunda a sexta
function WeekView() {
  const days = [1, 2, 3, 4, 5]

  return (
    <ScrollArea className="h-[460px]">
      <div className="grid grid-cols-5 gap-3">
        {days.map((d) => {
          const blocks = getBlocksForWeekday(d)

          return (
            <div key={d} className="min-w-0">
              <div className="mb-2 text-center">
                <p className="text-sm font-semibold">
                  {weekdayShort[d]}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {blocks.map((block) => {
                  const style = blockStyles[block.type]

                  return (
                    <div
                      key={block.id}
                      className={`rounded-md border-l-2 p-2 ${style.bar}`}
                    >
                      <p className="text-[11px] font-medium tabular-nums text-muted-foreground">
                        {block.start}
                      </p>

                      <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-tight">
                        {block.title}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

// Visão mensal: calendário + lista de blocos do dia selecionado
function MonthView() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const weekday = date
    ? date.getDay()
    : new Date().getDay()

  const blocks = getBlocksForWeekday(weekday)

  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border border-border"
          components={{
            Day: DayWithDots,
          }}
        />

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 px-1">
          {(
            Object.keys(blockStyles) as (keyof typeof blockStyles)[]
          ).map((type) => (
            <span
              key={type}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className={`size-1.5 rounded-full ${blockStyles[type].dot}`}
              />
              {blockStyles[type].label}
            </span>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-sm font-semibold">
            {date
              ? date.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })
              : "Selecione um dia"}
          </h3>

          <Badge variant="secondary" className="ml-auto">
            {blocks.length} blocos
          </Badge>
        </div>

        {blocks.length > 0 ? (
          <div className="flex flex-col gap-2">
            {blocks.map((block) => (
              <BlockRow key={block.id} block={block} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border py-12 text-center text-muted-foreground">
            <CalendarIcon className="size-8 opacity-50" />

            <p className="text-sm">
              Dia livre. Aproveite para descansar ou adiantar estudos.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function AgendaCalendar({
  compact = false,
}: {
  compact?: boolean
}) {
  // Para a visão diária começamos no dia útil mais próximo
  const today = new Date().getDay()

  const [dayWeekday, setDayWeekday] = useState(
    today === 0 || today === 6 ? 1 : today,
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarIcon className="size-4 text-primary" />
          Agenda
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={compact ? "diario" : "mensal"}>
          <TabsList className="mb-4">
            <TabsTrigger value="mensal">Mensal</TabsTrigger>
            <TabsTrigger value="semanal">Semanal</TabsTrigger>
            <TabsTrigger value="diario">Diário</TabsTrigger>
          </TabsList>

          <TabsContent value="mensal">
            <MonthView />
          </TabsContent>

          <TabsContent value="semanal">
            <WeekView />
          </TabsContent>

          <TabsContent value="diario">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setDayWeekday((d) => (d <= 1 ? 5 : d - 1))
                }
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Dia anterior"
              >
                <ChevronLeft className="size-4" />
              </button>

              <p className="text-sm font-semibold">
                {weekdayLabels[dayWeekday]}
              </p>

              <button
                type="button"
                onClick={() =>
                  setDayWeekday((d) => (d >= 5 ? 1 : d + 1))
                }
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Próximo dia"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <DayView weekday={dayWeekday} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}