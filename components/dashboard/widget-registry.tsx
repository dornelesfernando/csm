import type { ReactNode } from "react"
import type { Layout } from "react-grid-layout"
import {
  Sparkles,
  PenLine,
  CalendarDays,
  Target,
  Calendar,
  Heart,
  CalendarClock,
  GitBranch,
  TrendingUp,
  BookMarked,
  type LucideIcon,
} from "lucide-react"

import { GreetingBanner } from "@/components/dashboard/greeting-banner"
import { SmartCapture } from "@/components/dashboard/smart-capture"
import { SemesterSummary } from "@/components/dashboard/semester-summary"
import { CurrentGoals } from "@/components/dashboard/current-goals"
import { AgendaCalendar } from "@/components/agenda/agenda-calendar"
import { WellbeingWidget } from "@/components/dashboard/wellbeing-widget"
import { UpcomingCommitments } from "@/components/dashboard/upcoming-commitments"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { DevelopingCompetencies } from "@/components/dashboard/developing-competencies"
import { RecentMemories } from "@/components/dashboard/recent-memories"

export type Breakpoint = "lg" | "md" | "sm"

/** Layout sem o campo "i" (preenchido a partir do id do widget). */
type WidgetLayout = Omit<Layout, "i">

export interface DashboardWidget {
  id: string
  title: string
  icon: LucideIcon
  /** Layout padrao por breakpoint */
  defaultLayout: Record<Breakpoint, WidgetLayout>
  component: ReactNode
}

export const GRID_COLS: Record<Breakpoint, number> = { lg: 12, md: 8, sm: 4 }
export const GRID_BREAKPOINTS: Record<Breakpoint, number> = {
  lg: 1200,
  md: 768,
  sm: 0,
}
export const ROW_HEIGHT = 64

export const dashboardWidgets: DashboardWidget[] = [
  {
    id: "ai-banner",
    title: "Banner da IA",
    icon: Sparkles,
    defaultLayout: {
      lg: { x: 0, y: 0, w: 12, h: 2, minW: 4, minH: 2 },
      md: { x: 0, y: 0, w: 8, h: 2, minW: 4, minH: 2 },
      sm: { x: 0, y: 0, w: 4, h: 3, minW: 4, minH: 2 },
    },
    component: <GreetingBanner />,
  },
  {
    id: "smart-capture",
    title: "Captura inteligente",
    icon: PenLine,
    defaultLayout: {
      lg: { x: 0, y: 2, w: 12, h: 4, minW: 4, minH: 3 },
      md: { x: 0, y: 2, w: 8, h: 4, minW: 4, minH: 3 },
      sm: { x: 0, y: 3, w: 4, h: 5, minW: 4, minH: 3 },
    },
    component: <SmartCapture />,
  },
  {
    id: "semester-summary",
    title: "Resumo do semestre",
    icon: CalendarDays,
    defaultLayout: {
      lg: { x: 0, y: 6, w: 8, h: 5, minW: 4, minH: 4 },
      md: { x: 0, y: 6, w: 8, h: 5, minW: 4, minH: 4 },
      sm: { x: 0, y: 8, w: 4, h: 6, minW: 4, minH: 4 },
    },
    component: <SemesterSummary />,
  },
  {
    id: "current-goals",
    title: "Objetivos atuais",
    icon: Target,
    defaultLayout: {
      lg: { x: 8, y: 6, w: 4, h: 5, minW: 3, minH: 4 },
      md: { x: 0, y: 11, w: 4, h: 6, minW: 3, minH: 4 },
      sm: { x: 0, y: 14, w: 4, h: 6, minW: 4, minH: 4 },
    },
    component: <CurrentGoals />,
  },
  {
    id: "agenda-calendar",
    title: "Agenda",
    icon: Calendar,
    defaultLayout: {
      lg: { x: 0, y: 11, w: 8, h: 9, minW: 4, minH: 6 },
      md: { x: 0, y: 17, w: 8, h: 9, minW: 4, minH: 6 },
      sm: { x: 0, y: 20, w: 4, h: 9, minW: 4, minH: 6 },
    },
    component: <AgendaCalendar />,
  },
  {
    id: "wellbeing",
    title: "Bem-estar e rotina",
    icon: Heart,
    defaultLayout: {
      lg: { x: 8, y: 11, w: 4, h: 9, minW: 3, minH: 6 },
      md: { x: 4, y: 11, w: 4, h: 9, minW: 3, minH: 6 },
      sm: { x: 0, y: 29, w: 4, h: 8, minW: 4, minH: 6 },
    },
    component: <WellbeingWidget />,
  },
  {
    id: "upcoming-commitments",
    title: "Proximos compromissos",
    icon: CalendarClock,
    defaultLayout: {
      lg: { x: 0, y: 20, w: 4, h: 6, minW: 3, minH: 4 },
      md: { x: 0, y: 26, w: 4, h: 6, minW: 3, minH: 4 },
      sm: { x: 0, y: 37, w: 4, h: 6, minW: 4, minH: 4 },
    },
    component: <UpcomingCommitments />,
  },
  {
    id: "recent-activities",
    title: "Atividades recentes",
    icon: GitBranch,
    defaultLayout: {
      lg: { x: 4, y: 20, w: 4, h: 6, minW: 3, minH: 4 },
      md: { x: 4, y: 26, w: 4, h: 6, minW: 3, minH: 4 },
      sm: { x: 0, y: 43, w: 4, h: 7, minW: 4, minH: 4 },
    },
    component: <RecentActivities />,
  },
  {
    id: "developing-competencies",
    title: "Competencias em desenvolvimento",
    icon: TrendingUp,
    defaultLayout: {
      lg: { x: 8, y: 20, w: 4, h: 6, minW: 3, minH: 4 },
      md: { x: 0, y: 32, w: 4, h: 6, minW: 3, minH: 4 },
      sm: { x: 0, y: 50, w: 4, h: 7, minW: 4, minH: 4 },
    },
    component: <DevelopingCompetencies />,
  },
  {
    id: "recent-memories",
    title: "Memoria academica recente",
    icon: BookMarked,
    defaultLayout: {
      lg: { x: 0, y: 26, w: 12, h: 5, minW: 4, minH: 4 },
      md: { x: 0, y: 38, w: 8, h: 5, minW: 4, minH: 4 },
      sm: { x: 0, y: 57, w: 4, h: 8, minW: 4, minH: 4 },
    },
    component: <RecentMemories />,
  },
]

export const widgetMap = new Map(dashboardWidgets.map((w) => [w.id, w]))

/** Monta o objeto de layouts padrao para todos os breakpoints. */
export function buildDefaultLayouts(): Record<Breakpoint, Layout[]> {
  const breakpoints: Breakpoint[] = ["lg", "md", "sm"]
  return breakpoints.reduce(
    (acc, bp) => {
      acc[bp] = dashboardWidgets.map((widget) => ({
        i: widget.id,
        ...widget.defaultLayout[bp],
      }))
      return acc
    },
    {} as Record<Breakpoint, Layout[]>,
  )
}
