"use client"

import { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import type { SportEvent } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Gamepad2, Minus, Plus, CheckCircle2, Check } from "lucide-react"
import { motion } from "framer-motion"

interface EventCardProps {
  event: SportEvent
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const formatCurrency = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 })

type OutcomeKey = "teamA" | "draw" | "teamB"

export default function EventCard({ event }: EventCardProps) {
  const [amount, setAmount] = useState("")
  const [selected, setSelected] = useState<OutcomeKey | null>(null)
  const { placeBet } = useAuth()
  const { toast } = useToast()

  const hasDraw = event.drawOdds > 0
  const outcomeLabel = (k: OutcomeKey) => (k === "teamA" ? event.teamA : k === "teamB" ? event.teamB : "Empate")
  const outcomeOdds = (k: OutcomeKey) => (k === "teamA" ? event.oddsA : k === "teamB" ? event.oddsB : event.drawOdds)

  const parsedAmount = useMemo(() => {
    const n = Number.parseFloat(amount)
    return Number.isFinite(n) ? Math.max(0, n) : 0
  }, [amount])

  const potential = useMemo(() => {
    if (!selected || parsedAmount <= 0) return 0
    return Number((parsedAmount * outcomeOdds(selected)).toFixed(2))
  }, [parsedAmount, selected])

  const onConfirm = useCallback(async () => {
    if (!selected || parsedAmount <= 0) {
      toast({
        title: "Completa tu selección",
        description: !selected ? "Elige un equipo o Empate." : "Ingresa un monto mayor a 0.",
        variant: "destructive",
      })
      return
    }
    const label = outcomeLabel(selected)

    try {
      await placeBet(event.id, label, parsedAmount)
      toast({
        title: "¡Apuesta realizada!",
        description: `Apostaste ${formatCurrency(parsedAmount)} a ${label}. Potencial: ${formatCurrency(potential)}.`,
      });
      setAmount("");
      setSelected(null);
    } catch (error) {
      toast({
        title: "Error al realizar la apuesta",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  }, [selected, parsedAmount, potential, event.id, placeBet, toast])

  const applyQuick = (delta: number, exact = false) => {
    const current = parsedAmount
    const next = exact ? delta : current + delta
    setAmount(String(Number(next.toFixed(2))))
  }

  const stepAmount = (dir: "inc" | "dec", step = 1) => {
    const current = parsedAmount
    const next = dir === "inc" ? current + step : Math.max(0, current - step)
    setAmount(String(Number(next.toFixed(2))))
  }

  const eventDate = new Date(event.date)

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4, scale: 1.01 }} className="w-full">
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card/60 shadow-[0_0_0_1px_hsla(0,0%,100%,0.08)_inset,0_10px_30px_-12px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-border backdrop-blur-xl transition-all hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.12)_inset,0_18px_40px_-16px_rgba(0,0,0,0.4)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-70 transition-opacity group-hover:opacity-100"
        >
          <span className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,oklch(0.8_0.2_297/_0.2),transparent_25%,transparent_75%,oklch(0.8_0.2_297/_0.2))]" />
        </span>

        <CardHeader className="p-5">
          {event.category === "esport" && event.game && (
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs font-medium text-primary">
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>{event.game}</span>
            </span>
          )}
          <section className="flex items-center justify-between gap-6">
            <span className="flex flex-col items-center gap-2 text-center">
              <Image
                src={"https://liquipedia.net/commons/images/0/00/SK_Telecom_T1_full_allmode.png"}
                alt={`Logo ${event.teamA}`}
                width={56}
                height={56}
                className="rounded-full bg-muted/50 p-1.5"
                priority={false}
              />
              <span className="text-sm font-semibold">{event.teamA}</span>
            </span>
            <span className="text-2xl font-light text-muted-foreground">VS</span>
            <span className="flex flex-col items-center gap-2 text-center">
              <Image
                src={"https://liquipedia.net/commons/images/0/00/SK_Telecom_T1_full_allmode.png"}
                alt={`Logo ${event.teamB}`}
                width={56}
                height={56}
                className="rounded-full bg-muted/50 p-1.5"
                priority={false}
              />
              <span className="text-sm font-semibold">{event.teamB}</span>
            </span>
          </section>
          <section className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> {eventDate.toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </section>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-end gap-4 px-5 pb-5">
          <section className={`grid ${hasDraw ? "grid-cols-3" : "grid-cols-2"} gap-2`}>
            {(["teamA", ...(hasDraw ? (["draw"] as const) : []), "teamB"] as OutcomeKey[]).map((key) => {
              const isSelected = selected === key
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => setSelected((prev) => (prev === key ? null : key))}
                  className={`group relative flex h-auto flex-col items-center gap-1 overflow-hidden rounded-lg border px-3 py-2 text-left transition-colors ${isSelected
                      ? "border-primary/70 bg-primary/10"
                      : "border-border bg-secondary/40 hover:bg-secondary/60"
                    }`}
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={isSelected}
                  aria-label={`Seleccionar ${outcomeLabel(key)} con cuota ${outcomeOdds(key).toFixed(2)}`}
                >
                  {isSelected && (
                    <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-primary opacity-90" aria-hidden="true" />
                  )}
                  <span className="leading-none text-xs text-muted-foreground">{outcomeLabel(key)}</span>
                  <span className="leading-none text-base font-bold text-primary">{outcomeOdds(key).toFixed(2)}</span>
                </motion.button>
              )
            })}
          </section>

          <section className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => stepAmount("dec", 1)}
              aria-label="Restar 1"
              className="shrink-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id={`amount-${event.id}`}
              type="number"
              placeholder="Monto"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
              className="border-border bg-secondary/50"
              aria-label={`Monto para ${event.teamA} vs ${event.teamB}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  onConfirm()
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => stepAmount("inc", 1)}
              aria-label="Sumar 1"
              className="shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </section>

          <section className="flex flex-wrap items-center gap-2">
            {[5, 10, 20].map((v) => (
              <motion.button
                key={v}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={(e) => applyQuick(v, (e as any).shiftKey || (e as any).metaKey)}
                className="rounded-full border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0)_35%)] px-3 py-1 text-xs text-muted-foreground shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)] transition-colors hover:bg-secondary/70 hover:text-foreground dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0)_35%)]"
                title={`+${v} (Shift o ⌘ para establecer a ${v})`}
                aria-label={`Añadir ${v} al monto. Mantén Shift o ⌘ para establecer a ${v}`}
              >
                +{v}
              </motion.button>
            ))}
            <button
              type="button"
              onClick={() => setAmount("")}
              className="rounded-full border border-border bg-secondary/20 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
              aria-label="Limpiar monto"
            >
              Limpiar
            </button>
          </section>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-5 pt-0">
          <section className="flex w-full items-center justify-between rounded-lg bg-secondary/30 px-3 py-2 ring-1 ring-inset ring-border">
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {selected ? (
                <span>
                  Selección:{" "}
                  <strong className="text-foreground">
                    {outcomeLabel(selected)} ({event.oddsA.toFixed(2)})
                  </strong>
                  {" · "}
                  Monto: <strong className="text-foreground">{formatCurrency(parsedAmount || 0)}</strong>
                  {" · "}
                  Potencial: <strong className="text-success">{formatCurrency(potential || 0)}</strong>
                </span>
              ) : (
                <span>Elige un resultado y escribe un monto.</span>
              )}
            </p>
            <CheckCircle2 className="ml-3 hidden h-4 w-4 text-success sm:block" />
          </section>

          <motion.div className="w-full" whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onConfirm}
              className="relative w-full overflow-hidden shadow-lg shadow-primary/20 before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] before:opacity-0 before:transition-opacity hover:shadow-primary/30 hover:before:opacity-100"
              disabled={!selected || parsedAmount <= 0}
              aria-disabled={!selected || parsedAmount <= 0}
            >
              {selected && parsedAmount > 0
                ? `Apostar ${formatCurrency(parsedAmount)} a ${outcomeLabel(selected)} · Ganas ${formatCurrency(
                  potential,
                )}`
                : "Confirmar apuesta"}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
