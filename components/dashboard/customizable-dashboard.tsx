"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Responsive, WidthProvider, type Layout, type Layouts } from "react-grid-layout"
import { Plus } from "lucide-react"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DashboardToolbar } from "@/components/dashboard/dashboard-toolbar"
import { AddWidgetDrawer } from "@/components/dashboard/add-widget-drawer"
import { DashboardWidgetCard } from "@/components/dashboard/dashboard-widget-card"
import {
  buildDefaultLayouts,
  dashboardWidgets,
  widgetMap,
  GRID_COLS,
  GRID_BREAKPOINTS,
  ROW_HEIGHT,
  type Breakpoint,
} from "@/components/dashboard/widget-registry"

const ResponsiveGridLayout = WidthProvider(Responsive)

const STORAGE_KEY = "academic-dashboard-layout-v1"

interface PersistedState {
  layouts: Layouts
  /** ids de widgets visiveis, na ordem desejada */
  visible: string[]
}

const allWidgetIds = dashboardWidgets.map((w) => w.id)

function readPersistedState(): PersistedState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedState
    if (!parsed.layouts || !Array.isArray(parsed.visible)) return null
    return parsed
  } catch {
    return null
  }
}

export function CustomizableDashboard() {
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [layouts, setLayouts] = useState<Layouts>(() => buildDefaultLayouts())
  const [visible, setVisible] = useState<string[]>(allWidgetIds)
  const initialized = useRef(false)

  // Hidrata a partir do localStorage apenas no cliente para evitar mismatch.
  useEffect(() => {
    const persisted = readPersistedState()
    if (persisted) {
      setLayouts(persisted.layouts)
      // garante que apenas ids conhecidos sejam considerados
      setVisible(persisted.visible.filter((id) => widgetMap.has(id)))
    }
    initialized.current = true
    setMounted(true)
  }, [])

  // Persiste mudancas depois da inicializacao.
  useEffect(() => {
    if (!initialized.current) return
    const state: PersistedState = { layouts, visible }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [layouts, visible])

  const removedIds = useMemo(
    () => allWidgetIds.filter((id) => !visible.includes(id)),
    [visible],
  )

  function handleLayoutChange(_current: Layout[], allLayouts: Layouts) {
    if (!isEditing) return
    setLayouts(allLayouts)
  }

  function handleRemoveWidget(id: string) {
    setVisible((prev) => prev.filter((wid) => wid !== id))
  }

  function handleAddWidget(id: string) {
    const widget = widgetMap.get(id)
    if (!widget) return
    setVisible((prev) => [...prev, id])
    // Reinsere o item em cada breakpoint, empilhando ao final da coluna.
    setLayouts((prev) => {
      const next: Layouts = { ...prev }
      ;(Object.keys(GRID_COLS) as Breakpoint[]).forEach((bp) => {
        const existing = next[bp] ? [...next[bp]] : []
        if (existing.some((l) => l.i === id)) {
          next[bp] = existing
          return
        }
        const maxY = existing.reduce((m, l) => Math.max(m, l.y + l.h), 0)
        existing.push({ i: id, ...widget.defaultLayout[bp], y: maxY })
        next[bp] = existing
      })
      return next
    })
  }

  function handleReset() {
    setLayouts(buildDefaultLayouts())
    setVisible(allWidgetIds)
  }

  // Antes de hidratar, renderiza um placeholder estavel para o SSR.
  if (!mounted) {
    return (
      <div className="space-y-6">
        <DashboardIntro />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {dashboardWidgets.slice(0, 6).map((w) => (
            <div
              key={w.id}
              className="lg:col-span-6 animate-pulse rounded-xl border border-border bg-muted/40"
              style={{ height: ROW_HEIGHT * w.defaultLayout.lg.h }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <DashboardIntro />
        <DashboardToolbar
          isEditing={isEditing}
          removedCount={removedIds.length}
          onToggleEditing={() => setIsEditing((v) => !v)}
          onOpenDrawer={() => setDrawerOpen(true)}
          onReset={handleReset}
        />
      </div>

      {isEditing && (
        <p className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-muted-foreground text-pretty">
          Arraste pelos cabecalhos para reposicionar, redimensione pelos cantos
          e remova widgets pelo X. Use o botao Widgets para adicionar cartoes
          ocultos.
        </p>
      )}

      <div className={cn(isEditing && "dashboard-edit-grid rounded-xl")}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={GRID_BREAKPOINTS}
          cols={GRID_COLS}
          rowHeight={ROW_HEIGHT}
          margin={[24, 24]}
          containerPadding={[0, 0]}
          isDraggable={isEditing}
          isResizable={isEditing}
          draggableHandle=".drag-handle"
          onLayoutChange={handleLayoutChange}
          useCSSTransforms={mounted}
        >
          {visible.map((id) => {
            const widget = widgetMap.get(id)
            if (!widget) return null
            return (
              <div key={id}>
                <DashboardWidgetCard
                  title={widget.title}
                  icon={widget.icon}
                  isEditing={isEditing}
                  onRemove={() => handleRemoveWidget(id)}
                >
                  {widget.component}
                </DashboardWidgetCard>
              </div>
            )
          })}
        </ResponsiveGridLayout>
      </div>

      <AddWidgetDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        removedIds={removedIds}
        onAddWidget={handleAddWidget}
      />
    </div>
  )
}

function DashboardIntro() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-balance">
        Ola, Laura
      </h1>
      <p className="text-sm text-muted-foreground text-pretty">
        Este e o seu centro de comando. Acompanhe e construa sua trajetoria
        academica.
      </p>
    </div>
  )
}
