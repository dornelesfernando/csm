"use client"

import { useState, type ReactNode } from "react"
import { Plus, Tv } from "lucide-react"
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

export function AddScreenDialog({ trigger }: { trigger?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState("")
  const [local, setLocal] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim() || !local.trim()) {
      toast.error("Preencha o nome e a localizacao da tela.")
      return
    }
    toast.success("Tela adicionada", {
      description: `${nome} foi registrada e aguarda o primeiro pareamento.`,
    })
    setNome("")
    setLocal("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="size-4" />
            Adicionar Nova Tela
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Tv className="size-5" />
            </div>
            <DialogTitle>Adicionar nova tela</DialogTitle>
            <DialogDescription>
              Registre uma nova TV em modo quiosque. Um codigo de pareamento
              sera gerado para vincular o dispositivo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
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
              <Label htmlFor="tela-local">Localizacao</Label>
              <Input
                id="tela-local"
                placeholder="Ex: Bloco B - 2o andar"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tela-centro">Centro / Predio</Label>
              <Select defaultValue={CENTROS[0].id}>
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

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Gerar pareamento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
