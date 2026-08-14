"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AlertTriangle, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  servico: z.string().min(3, "Informe o servico afetado"),
  severidade: z.string().min(1, "Selecione o nivel de severidade"),
  sintomas: z.string().min(20, "Descreva os sintomas com mais detalhes (min. 20 caracteres)"),
})

type FormData = z.infer<typeof formSchema>

const severidades = [
  { value: "p1", label: "P1 - Critico (Sistema fora do ar)" },
  { value: "p2", label: "P2 - Alto (Funcionalidade critica afetada)" },
  { value: "p3", label: "P3 - Medio (Impacto limitado)" },
]

export function ReportarIncidenteDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      servico: "",
      severidade: "",
      sintomas: "",
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.error("Incidente reportado!", {
      description: `${data.severidade.toUpperCase()} - ${data.servico}. Time de plantao notificado.`,
    })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <AlertTriangle className="mr-2 size-4" />
          Reportar Incidente
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="size-5 text-red-600" />
            </div>
            <div>
              <DialogTitle>Reportar Incidente</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do incidente para acionar o time de resposta.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="servico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servico Afetado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: API de Pagamentos, Portal do Cliente..."
                      className="border-slate-200 focus-visible:ring-red-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="severidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel de Severidade</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-slate-200 focus:ring-red-500">
                        <SelectValue placeholder="Selecione a severidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {severidades.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sintomas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sintomas / Problema</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva os sintomas observados, erros retornados, usuarios impactados..."
                      className="min-h-[120px] resize-none border-slate-200 focus-visible:ring-red-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Reportando..." : "Reportar Incidente"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
