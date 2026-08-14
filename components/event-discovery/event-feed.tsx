"use client"

import { CalendarSearch } from "lucide-react"
import { EventCard } from "./event-card"
import { EmptyState } from "./empty-state"
import type { AcademicEvent } from "./event-data"

interface EventFeedProps {
  events: AcademicEvent[]
  onToggleSave: (id: string) => void
  onReset: () => void
}

export function EventFeed({ events, onToggleSave, onReset }: EventFeedProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarSearch className="size-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Feed de eventos
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">
          {events.length} {events.length === 1 ? "evento" : "eventos"}
        </span>
      </div>

      {events.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <EmptyState onReset={onReset} />
      )}
    </section>
  )
}
