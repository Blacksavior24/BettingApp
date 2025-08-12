"use client"

import AnimatedWrapper from "@/components/animated-wrapper";
import EventCard from "@/components/event-card";
import EventSkeleton from "@/components/event-skeleton";
import FiltersBar from "@/components/filters-bar";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

export default function Home() {

  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState("")
  const [minOdds, setMinOdds] = useState(1)

  const { sportEvents } = useAuth()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  const filter = (arr: typeof sportEvents, category?: "sport" | "esport") =>
    arr.filter((e) => {
      if (category && e.category !== category) return false;

      const q = query.toLowerCase().trim();
      const teams = `${e.teamA} ${e.teamB}`.toLowerCase();
      const game = (e.game ?? "").toLowerCase();
      const passesQuery = !q || teams.includes(q) || game.includes(q);

      const maxOdds = Math.max(e.oddsA, e.oddsB, e.drawOdds || 0);
      const passesOdds = maxOdds >= minOdds;

      return passesQuery && passesOdds;
    });

  const sports = useMemo(() => filter(sportEvents, "sport"), [sportEvents, query, minOdds]);

  const esports = useMemo(() => filter(sportEvents, "esport"), [sportEvents, query, minOdds]);

  return (
    <ProtectedRoute>
      <AnimatedWrapper>
        <section className="mx-auto max-w-7xl px-4 py-8">
          <header className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Eventos Disponibles</h1>
            <p className="text-muted-foreground">Explora y apuesta en deportes y e-sports.</p>
          </header>

          <section className="mb-6">
            <FiltersBar onSearchChange={setQuery} onMinOddsChange={setMinOdds} />
          </section>

          <Tabs defaultValue="sports" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50 md:w-[420px]">
              <TabsTrigger value="sports">Deportes</TabsTrigger>
              <TabsTrigger value="esports">E-Sports</TabsTrigger>
            </TabsList>

            <TabsContent value="sports">
              <motion.section
                className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {mounted
                  ? sports.map((event) => <EventCard key={event.id} event={event} />)
                  : Array.from({ length: 6 }).map((_, i) => <EventSkeleton key={i} />)}
                {mounted && sports.length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="flex h-full items-center justify-center p-10">
                      <p className="text-muted-foreground">No se encontraron eventos con los filtros actuales.</p>
                    </CardContent>
                  </Card>
                )}
              </motion.section>
            </TabsContent>

            <TabsContent value="esports">
              <motion.section
                className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {mounted
                  ? esports.map((event) => <EventCard key={event.id} event={event} />)
                  : Array.from({ length: 6 }).map((_, i) => <EventSkeleton key={i} />)}
                {mounted && esports.length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="flex h-full items-center justify-center p-10">
                      <p className="text-muted-foreground">No se encontraron eventos con los filtros actuales.</p>
                    </CardContent>
                  </Card>
                )}
              </motion.section>
            </TabsContent>
          </Tabs>

        </section>
      </AnimatedWrapper>
    </ProtectedRoute>
  );
}
