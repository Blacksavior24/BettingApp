"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { CommandIcon, Search, X } from "lucide-react"

interface FiltersBarProps {
  onSearchChange: (value: string) => void
  onMinOddsChange: (value: number) => void
}

export default function FiltersBar({ onSearchChange, onMinOddsChange }: FiltersBarProps) {
  const [query, setQuery] = useState("")
  const [minOdds, setMinOdds] = useState(1.0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => onSearchChange(query), 300)
    return () => clearTimeout(t)
  }, [query, onSearchChange])

  useEffect(() => {
    const t = setTimeout(() => onMinOddsChange(minOdds), 100)
    return () => clearTimeout(t)
  }, [minOdds, onMinOddsChange])

  return (
    <Card className="rounded-2xl bg-card/60 p-0 ring-1 ring-inset ring-border/70 backdrop-blur-xl">
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
        <span className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar equipo o juego..."
            className="bg-secondary/40 pl-10 pr-20"
            aria-label="Buscar equipo o juego"
          />
          {query && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-12 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setQuery("")}
              aria-label="Borrar búsqueda"
              title="Borrar búsqueda"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <span
            className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-secondary/50 px-1.5 py-0.5 text-xs text-muted-foreground sm:flex"
            aria-hidden="true"
          >
            <CommandIcon className="h-3 w-3" />
            <span>K</span>
          </span>
        </span>

        <span className="flex w-full items-center gap-4 md:w-auto md:max-w-xs">
          <span className="w-full">
            <label htmlFor="min-odds" className="mb-2 block text-xs text-muted-foreground">
              Cuota mínima: <span className="font-medium text-foreground">{minOdds.toFixed(2)}</span>
            </label>
            <Slider
              id="min-odds"
              min={1}
              max={5}
              step={0.1}
              value={[minOdds]}
              onValueChange={(v) => setMinOdds(v[0] ?? 1)}
            />
          </span>
        </span>
      </CardContent>
    </Card>
  )
}
