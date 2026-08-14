"use client"

import {
  Check,
  MoreVertical,
  Lock,
  BookOpen,
  Star,
  AlertTriangle,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import {
  STATUS_LABELS,
  TYPE_LABELS,
  type Course,
  type CourseStatus,
} from "./roadmap-data"

const STATUS_BORDER: Record<CourseStatus, string> = {
  approved: "border-l-emerald-500",
  current: "border-l-blue-500",
  exam: "border-l-amber-500",
  failed: "border-l-destructive",
  planned: "border-l-border border-dashed",
}

const STATUS_BADGE: Record<CourseStatus, string> = {
  approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  current: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  exam: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed: "border-destructive/30 bg-destructive/10 text-destructive",
  planned: "border-border bg-muted text-muted-foreground",
}

type CourseCardProps = {
  course: Course
  onOpen: (course: Course) => void
}

export function CourseCard({ course, onOpen }: CourseCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer border-l-4 p-3 transition-colors hover:border-primary/40",
        STATUS_BORDER[course.status],
      )}
      onClick={() => onOpen(course)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold leading-tight text-balance">
            {course.name}
          </h4>
          <span className="text-xs text-muted-foreground">{course.code}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0 text-muted-foreground"
            >
              <MoreVertical className="size-4" />
              <span className="sr-only">Acoes da disciplina</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem>Alterar Status</DropdownMenuItem>
            <DropdownMenuItem>Lancar Nota Final</DropdownMenuItem>
            <DropdownMenuItem>Editar Disciplina</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver Pre-requisitos</DropdownMenuItem>
            <DropdownMenuItem>Ver Dependentes</DropdownMenuItem>
            <DropdownMenuItem>Mover para outro semestre</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Remover do Planejamento
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Badges */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" className="text-xs font-normal">
          {course.workload}h
        </Badge>
        <Badge variant="secondary" className="text-xs font-normal">
          {TYPE_LABELS[course.type]}
        </Badge>
        <Badge
          variant="outline"
          className={cn("gap-1 text-xs font-normal", STATUS_BADGE[course.status])}
        >
          {course.status === "approved" && <Check className="size-3" />}
          {STATUS_LABELS[course.status]}
        </Badge>
        {course.status === "approved" && course.grade !== undefined && (
          <span className="text-xs text-muted-foreground">
            Nota {course.grade.toFixed(1)}
          </span>
        )}
      </div>

      {/* Indicadores */}
      {(course.prerequisites.length > 0 ||
        course.unlocks.length > 0 ||
        course.highPriority ||
        course.scheduleConflict) && (
        <div className="mt-2 flex items-center gap-2 text-muted-foreground">
          {course.prerequisites.length > 0 && (
            <Lock className="size-3.5" aria-label="Possui pre-requisitos" />
          )}
          {course.unlocks.length > 0 && (
            <BookOpen className="size-3.5" aria-label="Libera outras disciplinas" />
          )}
          {course.highPriority && (
            <Star
              className="size-3.5 text-amber-500"
              aria-label="Alta prioridade"
            />
          )}
          {course.scheduleConflict && (
            <AlertTriangle
              className="size-3.5 text-destructive"
              aria-label="Conflito de horario"
            />
          )}
        </div>
      )}
    </Card>
  )
}
