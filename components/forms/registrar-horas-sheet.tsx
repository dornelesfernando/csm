"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Check, ChevronsUpDown, Clock, Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  tarefa: z.string().min(1, "Selecione uma tarefa"),
  data: z.date({ required_error: "Selecione a data" }),
  inicio: z.string().min(1, "Informe o horario de inicio"),
  fim: z.string().min(1, "Informe o horario de fim"),
  natureza: z.string().min(1, "Selecione a natureza"),
  relato: z.string().min(10, "Descreva a atividade realizada (min. 10 caracteres)"),
})

type FormData = z.infer<typeof formSchema>

const tarefas = [
  { value: "task-001", label: "TASK-001 - Refatorar modulo de autenticacao" },
  { value: "task-002", label: "TASK-002 - Implementar dashboard financeiro" },
  { value: "task-003", label: "TASK-003 - Corrigir bug no carrinho" },
  { value: "task-004", label: "TASK-004 - Design System v2.0" },
  { value: "task-005", label: "TASK-005 - Configurar pipeline CI/CD" },
]

const naturezas = [
  { value: "dev", label: "Desenvolvimento" },
  { value: "reuniao", label: "Reuniao" },
  { value: "teste", label: "Teste" },
  { value: "documentacao", label: "Documentacao" },
  { value: "code-review", label: "Code Review" },
]

export function RegistrarHorasSheet() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [comboboxOpen, setComboboxOpen] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tarefa: "",
      inicio: "",
      fim: "",
      natureza: "",
      relato: "",
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success("Horas registradas com sucesso!", {
      description: `${data.inicio} - ${data.fim} em ${tarefas.find(t => t.value === data.tarefa)?.label.split(" - ")[0]}`,
    })
    form.reset()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Clock className="mr-2 size-4" />
          Registrar Horas
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-white sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Registrar Horas</SheetTitle>
          <SheetDescription>
            Registre rapidamente suas horas trabalhadas.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="tarefa"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tarefa Relacionada</FormLabel>
                  <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between border-slate-200 font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? tarefas.find((t) => t.value === field.value)?.label
                            : "Buscar tarefa..."}
                          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Buscar tarefa..." />
                        <CommandList>
                          <CommandEmpty>Nenhuma tarefa encontrada.</CommandEmpty>
                          <CommandGroup>
                            {tarefas.map((tarefa) => (
                              <CommandItem
                                key={tarefa.value}
                                value={tarefa.label}
                                onSelect={() => {
                                  field.onChange(tarefa.value)
                                  setComboboxOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 size-4",
                                    field.value === tarefa.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {tarefa.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
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
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="inicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inicio</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="border-slate-200 font-mono focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fim</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="border-slate-200 font-mono focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="natureza"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Natureza</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-slate-200 focus:ring-blue-500">
                        <SelectValue placeholder="Selecione a natureza" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {naturezas.map((n) => (
                        <SelectItem key={n.value} value={n.value}>
                          {n.label}
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
              name="relato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relato de Atividade</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o que foi feito..."
                      className="min-h-[100px] resize-none border-slate-200 focus-visible:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="pt-4">
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Salvando..." : "Registrar"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
