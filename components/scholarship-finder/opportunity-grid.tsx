import { OpportunityCard } from "./opportunity-card"
import { EmptyState } from "./empty-state"
import type { ScholarshipOpportunity } from "./scholarship-data"

interface OpportunityGridProps {
  opportunities: ScholarshipOpportunity[]
  onReset: () => void
}

export function OpportunityGrid({
  opportunities,
  onReset,
}: OpportunityGridProps) {
  if (opportunities.length === 0) {
    return <EmptyState onReset={onReset} />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  )
}
