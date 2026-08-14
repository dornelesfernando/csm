import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { type Semester } from "./roadmap-data"

type SemesterTimelineProps = {
  semesters: Semester[]
}

export function SemesterTimeline({ semesters }: SemesterTimelineProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <ol className="flex min-w-max items-center gap-2">
        {semesters.map((semester, index) => {
          const isCompleted = semester.state === "completed"
          const isCurrent = semester.state === "current"
          return (
            <li key={semester.number} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-xs font-semibold",
                    isCompleted &&
                      "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground",
                    !isCompleted &&
                      !isCurrent &&
                      "border-border text-muted-foreground",
                  )}
                >
                  {isCompleted ? <Check className="size-3.5" /> : semester.number}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  Sem {semester.number}
                  {isCurrent && " • Atual"}
                </span>
              </div>
              {index < semesters.length - 1 && (
                <span
                  className={cn(
                    "h-px w-8 shrink-0",
                    isCompleted ? "bg-emerald-500/40" : "bg-border",
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
