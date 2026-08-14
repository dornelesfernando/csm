"use client"

import { useMemo, useState } from "react"

import { Separator } from "@/components/ui/separator"

import {
  lattesSuggestions,
  type LattesSuggestion,
  type SuggestionStatus,
} from "./radar-data"
import { RadarHeader } from "./radar-header"
import { RadarStats } from "./radar-stats"
import { SuggestionCard } from "./suggestion-card"
import { RadarEmptyState } from "./radar-empty-state"
import { ArchivedSuggestionsSheet } from "./archived-suggestions-sheet"

export function RadarTab() {
  const [suggestions, setSuggestions] =
    useState<LattesSuggestion[]>(lattesSuggestions)

  const setStatus = (id: string, status: SuggestionStatus) => {
    setSuggestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    )
  }

  const counts = useMemo(() => {
    return suggestions.reduce(
      (acc, item) => {
        acc[item.status] += 1
        return acc
      },
      { pending: 0, prepared: 0, confirmed: 0, ignored: 0 } as Record<
        SuggestionStatus,
        number
      >,
    )
  }, [suggestions])

  // Itens ativos no feed: pendentes e preparados
  const feedItems = suggestions.filter(
    (item) => item.status === "pending" || item.status === "prepared",
  )
  // Arquivados: confirmados e ignorados
  const archivedItems = suggestions.filter(
    (item) => item.status === "confirmed" || item.status === "ignored",
  )

  return (
    <div className="space-y-5">
      <RadarHeader pendingCount={counts.pending} />
      <RadarStats
        pending={counts.pending}
        prepared={counts.prepared}
        confirmed={counts.confirmed}
        ignored={counts.ignored}
      />

      {feedItems.length > 0 ? (
        <div className="space-y-3">
          {feedItems.map((item) => (
            <SuggestionCard
              key={item.id}
              suggestion={item}
              onPrepare={(id) => setStatus(id, "prepared")}
              onConfirm={(id) => setStatus(id, "confirmed")}
              onIgnore={(id) => setStatus(id, "ignored")}
            />
          ))}
        </div>
      ) : (
        <RadarEmptyState onRefresh={() => setSuggestions(lattesSuggestions)} />
      )}

      <Separator />

      <div className="flex justify-center">
        <ArchivedSuggestionsSheet
          archived={archivedItems}
          onRestore={(id) => setStatus(id, "pending")}
        />
      </div>
    </div>
  )
}
