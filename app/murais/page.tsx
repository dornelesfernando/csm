import Link from "next/link"
import { Plus, MonitorPlay } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MuraisNav } from "@/components/murais/murais-nav"
import { MetricCards } from "@/components/murais/metric-cards"
import { UpdatesChart } from "@/components/murais/updates-chart"
import { SystemActivity } from "@/components/murais/system-activity"
import { AddScreenDialog } from "@/components/murais/add-screen-dialog"

export default function MuraisDashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Murais Digitais
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Gerencie os conteudos exibidos nas TVs em modo quiosque do campus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AddScreenDialog
            trigger={
              <Button variant="outline">
                <MonitorPlay className="size-4" />
                Nova Tela
              </Button>
            }
          />
          <Button asChild>
            <Link href="/murais/conteudos/novo">
              <Plus className="size-4" />
              Novo Conteudo
            </Link>
          </Button>
        </div>
      </div>

      <MuraisNav />

      <MetricCards />

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <UpdatesChart />
        </div>
        <div className="lg:col-span-2">
          <SystemActivity />
        </div>
      </div>
    </div>
  )
}
