"use client"

import { Loader as Loader2 } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

const PIN = "A7B-9X2"
const PAIRING_URL = `https://painel.mural.app/parear/${PIN}`

export function PlayerPairingScreen() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-zinc-950">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — instructions & PIN */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-bold text-white">
            Este dispositivo não está configurado.
          </h1>
          <p className="mt-4 text-xl text-zinc-400">
            Para começar a exibir conteúdos, acesse o painel pelo seu celular e
            digite o código abaixo:
          </p>

          <div className="relative mt-10">
            {/* animated glow ring */}
            <div className="absolute -inset-4 animate-pulse rounded-3xl bg-primary/20 blur-2xl" />
            <div className="relative rounded-2xl border border-zinc-700 bg-zinc-900 px-10 py-8 shadow-2xl">
              <p className="text-8xl font-mono font-bold tracking-widest text-white">
                {PIN}
              </p>
            </div>
          </div>
        </div>

        {/* Right — QR code */}
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-2xl bg-white p-4 shadow-xl">
            <QRCodeSVG value={PAIRING_URL} size={200} />
          </div>
          <p className="mt-4 text-center text-sm text-zinc-700">
            Ou escaneie para parear diretamente
          </p>
        </div>
      </div>

      {/* Footer — loading indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Loader2 className="size-4 animate-spin" />
          Aguardando autorização do servidor...
        </div>
      </div>
    </div>
  )
}
