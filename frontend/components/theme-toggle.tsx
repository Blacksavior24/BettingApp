"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(next)
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Cambiar tema"
      aria-pressed={isDark}
      title="Cambiar tema claro/oscuro"
      className="relative hover:bg-primary/10"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
