"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const formSchema = z.object({
  titulo: z.string().min(3, "Titulo deve ter no minimo 3 caracteres"),
  coluna: z.string().min(1, "Selecione a coluna de destino"),
  atribuido: z.string().min(1, "Selecione um responsavel"),
})

type FormData = z.infer<typeof formSchema>

const colunas = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "To Do" },
  { value: "doing", label: "Doing" },
  { value: "review", label: "Review" },
]

const membros = [
  { value: "ana", label: "Ana Silva", avatar: "/avatars/ana.jpg", initials: "AS" },
  { value: "carlos", label: "Carlos Santos", avatar: "/avatars/carlos.jpg", initials: "CS" },
  { value: "marina", label: "Marina Costa", avatar: "/avatars/marina.jpg", initials: "MC" },
  { value: "pedro", label: "Pedro Oliveira", avatar: "/avatars/pedro.jpg", initials: "PO" },
]

export function NovoCardDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      coluna: "backlog",
      atribuido: "",
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success("Card criado com sucesso!", {
      description: `"${data.titulo}" adicionado em ${colunas.find(c => c.value === data.coluna)?.label}`,
    })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 size-4" />
          Novo Card
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Card</DialogTitle>
          <DialogDescription>
            Crie um novo card para o Kanban de melhorias.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo do Card</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Melhorar UX do checkout"
                      className="border-slate-200 focus-visible:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coluna"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coluna de Destino</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-slate-200 focus:ring-blue-500">
                        <SelectValue placeholder="Selecione a coluna" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colunas.map((c) => (
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
              name="atribuido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atribuir a</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-slate-200 focus:ring-blue-500">
                        <SelectValue placeholder="Selecione um membro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {membros.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          <div className="flex items-center gap-2">
                            <Avatar className="size-5">
                              <AvatarImage src={m.avatar} />
                              <AvatarFallback className="text-xs">
                                {m.initials}
                              </AvatarFallback>
                            </Avatar>
                            {m.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Criando..." : "Criar Card"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
