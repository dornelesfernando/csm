"use client"

import { Inbox } from "lucide-react"

import { cn } from "@/lib/utils"
import { CourseCard } from "./course-card"
import { type Course, type Semester } from "./roadmap-data"

type SemesterColumnProps = {
  semester: Semester
  courses: Course[]
  onOpenCourse: (course: Course) => void
}

export function SemesterColumn({
  semester,
  courses,
  onOpenCourse,
}: SemesterColumnProps) {
  const totalWorkload = courses.reduce((sum, c) => sum + c.workload, 0)
  const isCurrent = semester.state === "current"

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl border border-border bg-muted/30">
      <div
        className={cn(
          "rounded-t-xl border-b border-border px-3 py-2.5",
          isCurrent && "bg-primary/5",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{semester.label}</h3>
          <span className="text-xs text-muted-foreground">
            {courses.length} disc.
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{totalWorkload} horas</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border py-8 text-center">
            <Inbox className="size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Nenhuma disciplina planejada
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
