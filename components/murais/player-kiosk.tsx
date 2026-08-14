"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { GraduationCap, ScanLine, X, ChevronLeft, ChevronRight } from "lucide-react"
import { CONTEUDOS, CONTENT_TYPES, centroById } from "./murais-data"

type Slide = {
  id: string
  titulo: string
  resumo: string
  tipo: keyof typeof CONTENT_TYPES
  alvo: string[]
  fim: string
  autor: string
  image?: string
  gradient: string
  url: string
}

// Playlist: apenas conteudos ativos entram na rotacao do mural
const PLAYLIST: Slide[] = CONTEUDOS.filter((c) => c.status === "ativo").map(
  (c) => ({
    id: c.id,
    titulo: c.titulo,
    resumo: c.resumo,
    tipo: c.tipo,
    alvo: c.alvo,
    fim: c.fim,
    autor: c.autor,
    image: c.id === "c-001" ? "/murais/semana-academica.png" : undefined,
    gradient: c.thumb,
    url: `https://murais.uni.edu/c/${c.id}`,
  }),
)

const SLIDE_MS = 9000

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

export function PlayerKiosk() {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const now = useClock()

  const slide = PLAYLIST[index]

  // Rotacao automatica com barra de progresso
  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min(100, (elapsed / SLIDE_MS) * 100))
    }, 50)
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % PLAYLIST.length)
    }, SLIDE_MS)
    return () => {
      clearInterval(tick)
      clearTimeout(next)
    }
  }, [index])

  const tipo = CONTENT_TYPES[slide.tipo]
  const TipoIcon = tipo.icon

  return (
    <div className="fixed inset-0 z-[60] flex h-screen w-screen flex-col overflow-hidden bg-neutral-950 text-white">
      {/* Barra de progresso da rotacao */}
      <div className="absolute inset-x-0 top-0 z-30 h-1.5 bg-white/10">
        <div
          className="h-full bg-sky-400 transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Imagem / fundo */}
      <div className="absolute inset-0">
        {slide.image ? (
          <Image
            src={slide.image || "/placeholder.svg"}
            alt=""
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${slide.gradient}`} />
        )}
        {/* Escurecimento para contraste do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/70" />
      </div>

      {/* Topo: identidade e relogio */}
      <header className="relative z-20 flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-sky-500 text-white">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <p className="text-lg font-bold leading-none">Mural Digital</p>
            <p className="text-sm text-white/60">Universidade Federal</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-3xl font-bold tabular-nums leading-none">
            {now
              ? now.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "--:--"}
          </p>
          <p className="mt-1 text-sm capitalize text-white/60">
            {now
              ? now.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                })
              : ""}
          </p>
        </div>

        {/* Botao discreto para sair do modo quiosque (preview) */}
        <Link
          href="/murais/telas"
          className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-white/40 opacity-40 transition hover:bg-white/20 hover:opacity-100"
          aria-label="Sair do modo quiosque"
        >
          <X className="size-4" />
        </Link>
      </header>

      {/* Rodape: informacoes sobre a imagem + QR Code */}
      <div className="relative z-20 mt-auto flex items-end justify-between gap-8 px-10 pb-10">
        <div className="max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide">
              <TipoIcon className="size-4" />
              {tipo.label}
            </span>
            <div className="flex items-center gap-2">
              {slide.alvo.slice(0, 4).map((id) => {
                const c = centroById(id)
                if (!c) return null
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur"
                  >
                    <span className={`size-2 rounded-full ${c.cor}`} />
                    {c.sigla}
                  </span>
                )
              })}
            </div>
          </div>

          <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
            {slide.titulo}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-xl leading-relaxed text-white/80 xl:text-2xl">
            {slide.resumo}
          </p>
          <p className="mt-4 text-base text-white/50">
            {slide.autor} &middot; em exibicao ate{" "}
            {new Date(slide.fim).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
            })}
          </p>
        </div>

        {/* QR Code */}
        <div className="shrink-0 rounded-3xl bg-white p-5 text-center text-neutral-900 shadow-2xl">
          <QRCodeSVG
            value={slide.url}
            size={168}
            level="M"
            marginSize={0}
            className="mx-auto"
          />
          <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold">
            <ScanLine className="size-4" />
            Saiba mais
          </p>
          <p className="text-xs text-neutral-500">Aponte a camera</p>
        </div>
      </div>

      {/* Indicadores + navegacao manual */}
      <div className="relative z-20 flex items-center justify-center gap-6 pb-6">
        <button
          type="button"
          onClick={() =>
            setIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
          }
          className="rounded-full bg-white/10 p-2 text-white/50 transition hover:bg-white/20 hover:text-white"
          aria-label="Anterior"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {PLAYLIST.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir para o slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-sky-400" : "w-4 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % PLAYLIST.length)}
          className="rounded-full bg-white/10 p-2 text-white/50 transition hover:bg-white/20 hover:text-white"
          aria-label="Proximo"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
