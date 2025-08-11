"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { LogOut, Trophy } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-lg">BettingApp</span>
        </Link>
        <section className="flex items-center gap-2 sm:gap-4">
          {user && (
            <>
              <Link
                href="/"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:inline-block"
              >
                Eventos
              </Link>
              <Link
                href="/history"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:inline-block"
              >
                Mi Historial
              </Link>
              <span className="hidden text-sm text-muted-foreground sm:inline">Hola, {user.username}</span>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Cerrar sesión">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
          <ThemeToggle />
        </section>
      </nav>
    </header>
  )
}