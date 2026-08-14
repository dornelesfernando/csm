import { Check, X, FileText } from "lucide-react"

import type { LattesSuggestion } from "./radar-data"

type SuggestionPreviewProps = {
  suggestion: LattesSuggestion
}

export function SuggestionPreview({ suggestion }: SuggestionPreviewProps) {
  return (
    <div className="space-y-4 border-t border-border pt-4">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Descricao completa
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-foreground/90">
          {suggestion.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Campos encontrados
          </h4>
          <ul className="mt-2 space-y-1.5">
            {suggestion.presentFields.map((field) => (
              <li key={field} className="flex items-center gap-2 text-sm">
                <Check className="size-3.5 shrink-0 text-emerald-500" />
                {field}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Campos ausentes
          </h4>
          {suggestion.missingFields.length > 0 ? (
            <ul className="mt-2 space-y-1.5">
              {suggestion.missingFields.map((field) => (
                <li
                  key={field}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <X className="size-3.5 shrink-0 text-destructive" />
                  {field}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Todos os campos necessarios foram detectados.
            </p>
          )}
        </div>
      </div>

      {suggestion.preview && (
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <FileText className="size-3.5" />
            Previa do texto formatado para o Lattes
          </h4>
          <p className="mt-2 rounded-lg border border-border bg-muted/50 p-3 text-sm italic leading-relaxed text-foreground/80">
            {suggestion.preview}
          </p>
        </div>
      )}
    </div>
  )
}
