"use client"

import { useState, type ReactNode } from "react"
import { Plus, Tv, Zap, ZapOff, ScanLine, ArrowLeft, ArrowRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CENTROS } from "./murais-data"

type Step = "scanner" | "form"

const SIMULATED_CODE = "A7B-9X2"

export function AddScreenDialog({ trigger }: { trigger?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("scanner")
  const [flashOn, setFlashOn] = useState(false)
  const [codeLocked, setCodeLocked] = useState(false)

  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [local, setLocal] = useState("")
  const [centro, setCentro] = useState(CENTROS[0].id)

  function resetState() {
    setStep("scanner")
    setFlashOn(false)
    setCodigo("")
    setNome("")
    setLocal("")
    setCentro(CENTROS[0].id)
    setCodeLocked(false)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) resetState()
  }

  function prosseguirScan() {
    setCodigo(SIMULATED_CODE)
    setCodeLocked(true)
    setStep("form")
  }

  function digitarManualmente() {
    setCodigo("")
    setCodeLocked(false)
    setStep("form")
  }

  function voltarScanner() {
    setStep("scanner")
    setCodigo("")
    setCodeLocked(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!codigo.trim() || !nome.trim() || !local.trim()) {
      toast.error("Preencha todos os campos para concluir o pareamento.")
      return
    }
    toast.success("Tela pareada com sucesso", {
      description: `${nome} foi registrada e vinculada ao código ${codigo}.`,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="size-4" />
            Adicionar Nova Tela
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {step === "scanner" ? (
          <>
            <DialogHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Tv className="size-5" />
              </div>
              <DialogTitle>Adicionar nova tela</DialogTitle>
              <DialogDescription>
                Aponte a câmera do dispositivo para o QR Code exibido na TV
                que deseja parear.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {/* Área do scanner */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                {/* Controle de flash */}
                <button
                  type="button"
                  onClick={() => setFlashOn((v) => !v)}
                  className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                  aria-label={flashOn ? "Desligar flash" : "Ligar flash"}
                >
                  {flashOn ? (
                    <Zap className="size-4" />
                  ) : (
                    <ZapOff className="size-4" />
                  )}
                </button>

                {/* Moldura do QR Code */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative size-40 rounded-lg border-2 border-dashed border-zinc-400 dark:border-zinc-600">
                    <span className="absolute -left-0.5 -top-0.5 size-5 border-l-2 border-t-2 border-primary" />
                    <span className="absolute -right-0.5 -top-0.5 size-5 border-r-2 border-t-2 border-primary" />
                    <span className="absolute -bottom-0.5 -left-0.5 size-5 border-b-2 border-l-2 border-primary" />
                    <span className="absolute -bottom-0.5 -right-0.5 size-5 border-b-2 border-r-2 border-primary" />
                    <ScanLine className="absolute inset-0 m-auto size-8 text-zinc-300 dark:text-zinc-700" />
                  </div>
                </div>
              </div>

              {/* Prosseguir */}
              <Button
                type="button"
                className="mt-4 w-full"
                onClick={prosseguirScan}
              >
                Prosseguir (Simular Scan)
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={digitarManualmente}
              >
                Digitar código manualmente
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Tv className="size-5" />
              </div>
              <DialogTitle>Configurar nova tela</DialogTitle>
              <DialogDescription>
                Confirme o código do dispositivo e os dados de cadastro da
                tela.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tela-codigo">Código do Dispositivo</Label>
                <Input
                  id="tela-codigo"
                  placeholder="Ex: A7B-9X2"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  readOnly={codeLocked}
                  className={codeLocked ? "select-none opacity-70" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tela-nome">Nome da tela</Label>
                <Input
                  id="tela-nome"
                  placeholder="Ex: Hall Principal"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tela-local">Localização</Label>
                <Input
                  id="tela-local"
                  placeholder="Ex: Bloco B - 2o andar"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tela-centro">Centro / Prédio</Label>
                <Select value={centro} onValueChange={setCentro}>
                  <SelectTrigger id="tela-centro">
                    <SelectValue placeholder="Selecione o centro" />
                  </SelectTrigger>
                  <SelectContent>
                    {CENTROS.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={voltarScanner}
              >
                <ArrowLeft className="size-4" />
                Voltar
              </Button>
              <Button type="submit">Concluir Pareamento</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
