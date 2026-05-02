"use client"

import { useEffect, useMemo, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = useMemo(() => {
    if (!mounted) return "light"
    if (theme === "system") return systemTheme ?? "light"
    return theme
  }, [mounted, systemTheme, theme])

  const isDarkMode = currentTheme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-primary/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80",
        className,
      )}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300">
        <Sun
          className={cn(
            "absolute transition-all duration-300",
            isDarkMode ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
          size={18}
        />
        <Moon
          className={cn(
            "absolute transition-all duration-300",
            isDarkMode ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
          size={18}
        />
      </span>
    </button>
  )
}
