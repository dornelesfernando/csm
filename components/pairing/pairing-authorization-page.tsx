"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, CircleCheck as CheckCircle2, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const BUILDINGS = [
  "Sede Central",
  "Prédio A",
  "Prédio B",
  "Refeitório",
  "Auditório",
  "Bloco Norte",
  "Bloco Sul",
  "Laboratório",
  "Biblioteca",
  "Ginásio",
]

const PIN = "A7B-9X2"

const schema = z.object({
  pin: z.string(),
  deviceName: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres"),
  building: z.string().min(1, "Selecione um centro ou prédio"),
  applyDefaults: z.boolean(),
})

type FormValues = z.infer<typeof schema>

export function PairingAuthorizationPage() {
  const [authorized, setAuthorized] = useState(false)
  const [buildingOpen, setBuildingOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      pin: PIN,
      deviceName: "",
      building: "",
      applyDefaults: false,
    },
  })

  const selectedBuilding = watch("building")

  const onSubmit = (data: FormValues) => {
    console.log("Device authorized", data)
    setAuthorized(true)
  }

  const handleCancel = () => {
    console.log("Pairing cancelled")
    reset()
    setAuthorized(false)
  }

  const handleNavigateConfig = () => {
    console.log("Navigate to content config")
  }

  if (authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 dark:bg-zinc-950">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-2xl">Dispositivo Autorizado</CardTitle>
            <CardDescription>
              O dispositivo foi pareado com sucesso e já pode exibir conteúdos
              do sistema de murais.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={handleNavigateConfig}
            >
              Configurar Conteúdos / Templates
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                reset()
                setAuthorized(false)
              }}
            >
              Parear outro dispositivo
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Autorizar Novo Dispositivo</CardTitle>
          <CardDescription>
            Um novo dispositivo está solicitando acesso ao sistema de murais.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="pairing-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* PIN — read-only */}
            <div className="space-y-2">
              <Label htmlFor="pin">Código de Pareamento (PIN)</Label>
              <Input
                id="pin"
                value={PIN}
                readOnly
                className="select-none pointer-events-none cursor-not-allowed opacity-70"
              />
            </div>

            {/* Device name */}
            <div className="space-y-2">
              <Label htmlFor="deviceName">Nome do Dispositivo</Label>
              <Input
                id="deviceName"
                placeholder="Ex: TV Refeitório"
                {...register("deviceName")}
                aria-invalid={!!errors.deviceName}
              />
              {errors.deviceName && (
                <p className="text-sm text-destructive">
                  {errors.deviceName.message}
                </p>
              )}
            </div>

            {/* Building — searchable combobox */}
            <div className="space-y-2">
              <Label htmlFor="building">Centro / Prédio</Label>
              <Popover open={buildingOpen} onOpenChange={setBuildingOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    id="building"
                    role="combobox"
                    aria-expanded={buildingOpen}
                    className={cn(
                      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      !selectedBuilding && "text-muted-foreground",
                    )}
                  >
                    {selectedBuilding || "Selecione um centro ou prédio..."}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar centro ou prédio..." />
                    <CommandList>
                      <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                      <CommandGroup>
                        {BUILDINGS.map((building) => (
                          <CommandItem
                            key={building}
                            value={building}
                            onSelect={() => {
                              setValue("building", building, {
                                shouldValidate: true,
                              })
                              setBuildingOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                selectedBuilding === building
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {building}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.building && (
                <p className="text-sm text-destructive">
                  {errors.building.message}
                </p>
              )}
            </div>

            {/* Apply defaults — switch */}
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5 pr-4">
                <Label htmlFor="applyDefaults">
                  Aplicar configurações padrão de exibição imediatamente
                </Label>
                <p className="text-sm text-muted-foreground">
                  O dispositivo iniciará com o template padrão assim que
                  autorizado.
                </p>
              </div>
              <Switch
                id="applyDefaults"
                checked={watch("applyDefaults")}
                onCheckedChange={(checked) =>
                  setValue("applyDefaults", checked, { shouldValidate: true })
                }
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCancel}
          >
            Cancelar Pareamento
          </Button>
          <Button
            type="submit"
            form="pairing-form"
            className="w-full"
            disabled={!isValid}
          >
            Autorizar Dispositivo
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


