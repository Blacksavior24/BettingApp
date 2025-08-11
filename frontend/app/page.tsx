"use client"

import AnimatedWrapper from "@/components/animated-wrapper";
import ProtectedRoute from "@/components/protected-route";

export default function Home() {

  console.log('llegamos a page app')
  return (
    <ProtectedRoute>
      <AnimatedWrapper>
        <section className="mx-auto max-w-7xl px-4 py-8">
          <header className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Eventos Disponibles</h1>
            <p className="text-muted-foreground">Explora y apuesta en deportes y e-sports.</p>
          </header>

        </section>
      </AnimatedWrapper>
    </ProtectedRoute>
  );
}
