"use client"

import { useMemo, useState } from "react"

import { RoadmapHeader } from "@/components/roadmap/roadmap-header"
import { ProgressCards } from "@/components/roadmap/progress-cards"
import { SemesterTimeline } from "@/components/roadmap/semester-timeline"
import { SemesterKanban } from "@/components/roadmap/semester-kanban"
import { PlanningAssistant } from "@/components/roadmap/planning-assistant"
import { CourseDetailsSheet } from "@/components/roadmap/course-details-sheet"
import {
  RoadmapToolbar,
  type RoadmapFilter,
} from "@/components/roadmap/roadmap-toolbar"
import {
  aiSuggestions,
  courses as allCourses,
  progressStats,
  semesters,
  suggestionCatalog,
  type Course,
} from "@/components/roadmap/roadmap-data"

function matchesFilter(course: Course, filter: RoadmapFilter): boolean {
  switch (filter) {
    case "all":
      return true
    case "required":
    case "elective":
    case "dcg":
      return course.type === filter
    default:
      return course.status === filter
  }
}

export default function RoadmapPlannerPage() {
  const [courses, setCourses] = useState<Course[]>(allCourses)
  const [suggestions, setSuggestions] = useState(aiSuggestions)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<RoadmapFilter>("all")
  const [selected, setSelected] = useState<Course | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return courses.filter((course) => {
      const matchesQuery =
        normalized.length === 0 ||
        course.name.toLowerCase().includes(normalized) ||
        course.code.toLowerCase().includes(normalized)
      return matchesQuery && matchesFilter(course, filter)
    })
  }, [courses, query, filter])

  const openCourse = (course: Course) => {
    setSelected(course)
    setSheetOpen(true)
  }

  const addSuggestion = (courseId: string) => {
    const meta = suggestionCatalog[courseId]
    if (!meta) return
    setCourses((prev) => {
      if (prev.some((c) => c.id === courseId)) return prev
      const newCourse: Course = {
        id: courseId,
        code: meta.code,
        name: meta.name,
        workload: meta.workload,
        semester: 4,
        type: "required",
        status: "planned",
        prerequisites: [],
        corequisites: [],
        unlocks: [],
      }
      return [...prev, newCourse]
    })
    setSuggestions((prev) => prev.filter((s) => s.courseId !== courseId))
  }

  const ignoreSuggestion = (courseId: string) => {
    setSuggestions((prev) => prev.filter((s) => s.courseId !== courseId))
  }

  const addAll = () => {
    suggestions.forEach((s) => addSuggestion(s.courseId))
  }

  return (
    <div className="space-y-6">
      <RoadmapHeader />
      <ProgressCards stats={progressStats} />

      <div>
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
          Linha do Tempo Academica
        </h2>
        <SemesterTimeline semesters={semesters} />
      </div>

      <RoadmapToolbar
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1">
          <SemesterKanban
            semesters={semesters}
            courses={filteredCourses}
            onOpenCourse={openCourse}
          />
        </div>
        <PlanningAssistant
          suggestions={suggestions}
          onAdd={addSuggestion}
          onIgnore={ignoreSuggestion}
          onAddAll={addAll}
        />
      </div>

      <CourseDetailsSheet
        course={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
