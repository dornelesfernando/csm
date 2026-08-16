"use client"

import { useMemo, useState } from "react"

import { EventHeader } from "@/components/event-discovery/event-header"
import { EventStats } from "@/components/event-discovery/event-stats"
import { EventFilters } from "@/components/event-discovery/event-filters"
import { EventFeed } from "@/components/event-discovery/event-feed"
import { EventCalendarWidget } from "@/components/event-discovery/event-calendar-widget"
import { AIInsightCard } from "@/components/event-discovery/ai-insight-card"
import {
  academicEvents,
  type AcademicEvent,
  type EventCategory,
} from "@/components/event-discovery/event-data"

export default function EventDiscoveryPage() {
  const [events, setEvents] = useState<AcademicEvent[]>(academicEvents)
  const [query, setQuery] = useState("")
  const [activeCategories, setActiveCategories] = useState<EventCategory[]>([])

  function toggleCategory(category: EventCategory) {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
  }

  function toggleSave(id: string) {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, saved: !event.saved } : event,
      ),
    )
  }

  function resetFilters() {
    setQuery("")
    setActiveCategories([])
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events
      .filter((event) => {
        const matchesCategory =
          activeCategories.length === 0 ||
          activeCategories.includes(event.category)
        const matchesQuery =
          !q ||
          event.title.toLowerCase().includes(q) ||
          event.institution.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q) ||
          event.tags.some((tag) => tag.toLowerCase().includes(q))
        return matchesCategory && matchesQuery
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [events, query, activeCategories])

  return (
    <div className="space-y-6">
      <EventHeader onRefresh={resetFilters} />

      <EventStats />

      <EventFilters
        query={query}
        onQueryChange={setQuery}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EventFeed
            events={filtered}
            onToggleSave={toggleSave}
            onReset={resetFilters}
          />
        </div>
        <div className="flex flex-col gap-6">
          <EventCalendarWidget />
          <AIInsightCard />
        </div>
      </div>
    </div>
  )
}
