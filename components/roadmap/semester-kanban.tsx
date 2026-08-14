"use client"

import { SemesterColumn } from "./semester-column"
import { type Course, type Semester } from "./roadmap-data"

type SemesterKanbanProps = {
  semesters: Semester[]
  courses: Course[]
  onOpenCourse: (course: Course) => void
}

export function SemesterKanban({
  semesters,
  courses,
  onOpenCourse,
}: SemesterKanbanProps) {
  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex min-w-max gap-3">
        {semesters.map((semester) => (
          <SemesterColumn
            key={semester.number}
            semester={semester}
            courses={courses.filter((c) => c.semester === semester.number)}
            onOpenCourse={onOpenCourse}
          />
        ))}
      </div>
    </div>
  )
}
