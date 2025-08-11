"use client"

import AnimatedWrapper from '@/components/animated-wrapper'
import ProtectedRoute from '@/components/protected-route'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/auth-context'
import type { Bet } from '@/lib/types'
import { Filter, Gamepad2, Trophy } from 'lucide-react'
import React from 'react'

export default function HistoryPage() {
    const { bets } = useAuth()

    const getBadgeVariant = (status: Bet["status"]) => {
    switch (status) {
      case "Ganada":
        return "success"
      case "Perdida":
        return "destructive"
      case "Pendiente":
      default:
        return "secondary"
    }
  }

  const categories: Array<"all" | "sport" | "esport"> = ["all", "sport", "esport"]
  const byCategory = (cat: "all" | "sport" | "esport") =>
    bets.filter((b) => (cat === "all" ? true : b.eventDetails?.category === cat))

  return (
    <ProtectedRoute>
      <AnimatedWrapper>
                <section className="mx-auto max-w-7xl px-4 py-8">
          <header className="mb-6">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Historial de Apuestas</h1>
            <p className="text-muted-foreground">Revisa tus apuestas pasadas y pendientes.</p>
          </header>

          <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            Filtra por categoría:
          </p>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary/50 md:w-[520px]">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="sport">Deportes</TabsTrigger>
              <TabsTrigger value="esport">E‑Sports</TabsTrigger>
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat}>
                <Card className="mt-6 overflow-hidden border border-border bg-card/50 backdrop-blur-lg">
                  {byCategory(cat).length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-border">
                          <TableHead>Evento</TableHead>
                          <TableHead>Selección</TableHead>
                          <TableHead className="text-right">Monto</TableHead>
                          <TableHead className="text-right">Ganancia Potencial</TableHead>
                          <TableHead className="text-center">Estado</TableHead>
                          <TableHead>Fecha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {byCategory(cat).map((bet) => (
                          <TableRow key={bet.id} className="border-b-0">
                            <TableCell className="font-medium">
                              <span className="flex items-center gap-2">
                                {bet.eventDetails?.category === "esport" ? (
                                  <Gamepad2 className="h-4 w-4 flex-shrink-0 text-primary" />
                                ) : (
                                  <Trophy className="h-4 w-4 flex-shrink-0 text-primary" />
                                )}
                                <span className="flex flex-col">
                                  {bet.eventDetails?.category === "esport" && bet.eventDetails.game && (
                                    <span className="block text-xs text-muted-foreground">{bet.eventDetails.game}</span>
                                  )}
                                  <span>
                                    {bet.eventDetails?.teamA} vs {bet.eventDetails?.teamB}
                                  </span>
                                </span>
                              </span>
                            </TableCell>
                            <TableCell>{bet.selectedOutcome}</TableCell>
                            <TableCell className="text-right">${bet.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-bold text-success">
                              ${bet.potentialWinnings.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={getBadgeVariant(bet.status)}>{bet.status}</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(bet.date).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <CardContent className="p-10 text-center text-muted-foreground">
                      <p>No hay apuestas en esta categoría todavía.</p>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </AnimatedWrapper>
    </ProtectedRoute>
  )

}