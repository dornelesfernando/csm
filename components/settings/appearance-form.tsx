"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Monitor, Check } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const themeOptions = [
  {
    value: "light",
    label: "Claro",
    icon: Sun,
    description: "Tema claro para ambientes iluminados.",
    previewBg: "bg-[hsl(210,40%,98%)]",
    previewCard: "bg-white",
    previewText: "bg-[hsl(222,47%,11%)]",
    previewMuted: "bg-[hsl(214,32%,91%)]",
  },
  {
    value: "dark",
    label: "Escuro",
    icon: Moon,
    description: "Tema escuro para reduzir fadiga visual.",
    previewBg: "bg-[hsl(222,47%,6%)]",
    previewCard: "bg-[hsl(222,47%,9%)]",
    previewText: "bg-[hsl(210,40%,98%)]",
    previewMuted: "bg-[hsl(222,47%,16%)]",
  },
  {
    value: "system",
    label: "Sistema",
    icon: Monitor,
    description: "Segue a preferencia do seu sistema operacional.",
    previewBg: "bg-gradient-to-r from-[hsl(210,40%,98%)] to-[hsl(222,47%,6%)]",
    previewCard: "bg-gradient-to-r from-white to-[hsl(222,47%,9%)]",
    previewText: "bg-[hsl(215,16%,47%)]",
    previewMuted: "bg-gradient-to-r from-[hsl(214,32%,91%)] to-[hsl(222,47%,16%)]",
  },
]

export function AppearanceForm() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState("pt-br")
  const [dateFormat, setDateFormat] = useState("dd-mm-yyyy")

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>
            Selecione a aparencia da interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {themeOptions.map((option) => {
              const isActive = mounted && theme === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value)}
                  className={`relative flex flex-col items-start gap-3 rounded-lg border-2 p-4 text-left transition-all hover:border-primary/50 ${
                    isActive
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  {isActive && (
                    <div className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </div>
                  )}

                  <div
                    className={`w-full rounded-md ${option.previewBg} p-3 space-y-2`}
                  >
                    <div className={`h-2 w-12 rounded ${option.previewText}`} />
                    <div
                      className={`rounded ${option.previewCard} p-2 space-y-1.5`}
                    >
                      <div
                        className={`h-1.5 w-16 rounded ${option.previewMuted}`}
                      />
                      <div
                        className={`h-1.5 w-10 rounded ${option.previewMuted}`}
                      />
                    </div>
                    <div
                      className={`rounded ${option.previewCard} p-2 space-y-1.5`}
                    >
                      <div
                        className={`h-1.5 w-14 rounded ${option.previewMuted}`}
                      />
                      <div
                        className={`h-1.5 w-8 rounded ${option.previewMuted}`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <option.icon className="size-4" />
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Idioma e Formato</CardTitle>
          <CardDescription>
            Configure o idioma e formatos de exibicao.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-br">Portugues (Brasil)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Espanol</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Formato de data</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">DD/MM/AAAA</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/DD/AAAA</SelectItem>
                  <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
