"use client"

import { Lock, BookOpen, Link2, GraduationCap } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  STATUS_LABELS,
  TYPE_LABELS,
  courses,
  type Course,
} from "./roadmap-data"

type CourseDetailsSheetProps = {
  course: Course | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function courseLabel(id: string) {
  const found = courses.find((c) => c.id === id)
  return found ? `${found.code} - ${found.name}` : id
}

function Section({
  title,
  icon: Icon,
  ids,
  emptyText,
}: {
  title: string
  icon: typeof Lock
  ids: string[]
  emptyText: string
}) {
  return (
    <div>
      <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {title}
      </h4>
      {ids.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ids.map((id) => (
            <Badge key={id} variant="outline" className="font-normal">
              {courseLabel(id)}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="mt-1 text-sm text-muted-foreground">{emptyText}</p>
      )}
    </div>
  )
}

export function CourseDetailsSheet({
  course,
  open,
  onOpenChange,
}: CourseDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-lg">
        {course && (
          <>
            <SheetHeader>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="secondary" className="font-normal">
                  {course.code}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {course.workload}h
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {TYPE_LABELS[course.type]}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {STATUS_LABELS[course.status]}
                </Badge>
              </div>
              <SheetTitle className="text-balance">{course.name}</SheetTitle>
              <SheetDescription>
                {course.description ?? "Sem descricao disponivel."}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="-mx-6 flex-1 px-6">
              <div className="space-y-5 py-4">
                {course.syllabus && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Ementa
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                      {course.syllabus}
                    </p>
                  </div>
                )}

                <Section
                  title="Pre-requisitos"
                  icon={Lock}
                  ids={course.prerequisites}
                  emptyText="Nenhum pre-requisito."
                />
                <Section
                  title="Co-requisitos"
                  icon={Link2}
                  ids={course.corequisites}
                  emptyText="Nenhum co-requisito."
                />
                <Section
                  title="Disciplinas desbloqueadas"
                  icon={BookOpen}
                  ids={course.unlocks}
                  emptyText="Nao libera outras disciplinas."
                />

                {course.bibliography && course.bibliography.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Bibliografia
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {course.bibliography.map((book) => (
                        <li
                          key={book}
                          className="text-sm leading-relaxed text-foreground/85"
                        >
                          {book}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Historico do aluno
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {course.grade !== undefined
                      ? `Nota final: ${course.grade.toFixed(1)}`
                      : "Sem nota lancada"}
                  </span>
                </div>

                {course.notes && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Observacoes
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                      {course.notes}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
