import { MuraisNav } from "@/components/murais/murais-nav"
import { ScreenCard } from "@/components/murais/screen-card"
import { AddScreenDialog } from "@/components/murais/add-screen-dialog"
import { TELAS } from "@/components/murais/murais-data"

export default function TelasPage() {
  const online = TELAS.filter((t) => t.status === "online").length
  const offline = TELAS.filter((t) => t.status === "offline").length
  const sync = TELAS.filter((t) => t.status === "sincronizando").length

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">
            Gerenciamento de Telas
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Monitore o status dos dispositivos e gerencie os murais do campus.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              {online} online
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" />
              {sync} sincronizando
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-rose-500" />
              {offline} offline
            </span>
          </div>
        </div>
        <AddScreenDialog />
      </div>

      <MuraisNav />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TELAS.map((tela) => (
          <ScreenCard key={tela.id} tela={tela} />
        ))}
      </div>
    </div>
  )
}
