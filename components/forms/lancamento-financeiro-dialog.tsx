"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, ChevronDown, Plus } from "lucide-react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  tipo: z.enum(["receita", "despesa"]),
  valor: z.string().min(1, "Informe o valor"),
  categoria: z.string().min(1, "Selecione a categoria"),
  vencimento: z.date({ required_error: "Selecione a data de vencimento" }),
  status: z.string().min(1, "Selecione o status"),
  descricao: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const categoriasReceita = [
  { value: "contrato", label: "Contrato" },
  { value: "consultoria", label: "Consultoria" },
  { value: "suporte", label: "Suporte" },
  { value: "licenca", label: "Licenca" },
]

const categoriasDespesa = [
  { value: "infraestrutura", label: "Infraestrutura" },
  { value: "folha", label: "Folha de Pagamento" },
  { value: "ferramentas", label: "Ferramentas" },
  { value: "marketing", label: "Marketing" },
  { value: "outros", label: "Outros" },
]

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "pago", label: "Pago" },
]

export function LancamentoFinanceiroDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "receita",
      valor: "",
      categoria: "",
      status: "pendente",
      descricao: "",
    },
  })

  const tipoAtual = form.watch("tipo")

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success(
      data.tipo === "receita" ? "Receita registrada!" : "Despesa registrada!",
      {
        description: `R$ ${data.valor} - ${data.tipo === "receita" ? categoriasReceita : categoriasDespesa
          }.find(c => c.value === data.categoria)?.label}`,
      }
    )
    form.reset()
    setOpen(false)
  }

  function openWithType(tipo: "receita" | "despesa") {
    form.setValue("tipo", tipo)
    form.setValue("categoria", "")
    setOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Plus className="mr-2 size-4" />
            Novo Lancamento
            <ChevronDown className="ml-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => openWithType("receita")}>
            <Plus className="mr-2 size-4 text-emerald-600" />
            Nova Receita
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openWithType("despesa")}>
            <Plus className="mr-2 size-4 text-red-600" />
            Novo Custo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Novo Lancamento Financeiro</DialogTitle>
            <DialogDescription>
              Registre uma nova receita ou despesa no sistema.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <Tabs
                      value={field.value}
                      onValueChange={(v) => {
                        field.onChange(v)
                        form.setValue("categoria", "")
                      }}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="receita" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
                          Receita
                        </TabsTrigger>
                        <TabsTrigger value="despesa" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                          Despesa
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          R$
                        </span>
                        <Input
                          type="text"
                          placeholder="0,00"
                          className={cn(
                            "border-slate-200 pl-10 font-mono",
                            tipoAtual === "receita"
                              ? "focus-visible:ring-emerald-500"
                              : "focus-visible:ring-red-500"
                          )}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-slate-200">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(tipoAtual === "receita"
                            ? categoriasReceita
                            : categoriasDespesa
                          ).map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-slate-200">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((s) => (
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
              </div>

              <FormField
                control={form.control}
                name="vencimento"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Vencimento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start border-slate-200 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione a data</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                  className={
                    tipoAtual === "receita"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-600 hover:bg-red-700"
                  }
                >
                  {isLoading ? "Salvando..." : "Registrar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
