"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { RiMoonLine, RiSunLine } from "@remixicon/react"
import { cn } from "@/lib/utils"

function useMountedTheme() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // next-themes can't know the system theme during SSR; defer until mounted so
  // the control never flashes the wrong state or causes a hydration mismatch.
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0)
    return () => window.clearTimeout(id)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  return { isDark, setTheme }
}

/**
 * Two-part segmented light/dark switch. Used where there's room to label it
 * (e.g. the mobile menu). Picking a side pins that theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { isDark, setTheme } = useMountedTheme()

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center border border-border bg-background",
        className
      )}
    >
      <button
        type="button"
        aria-label="Use light theme"
        aria-pressed={!isDark}
        onClick={() => setTheme("light")}
        className={cn(
          "grid size-8 place-items-center transition-colors",
          !isDark
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <RiSunLine aria-hidden className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        aria-pressed={isDark}
        onClick={() => setTheme("dark")}
        className={cn(
          "grid size-8 place-items-center transition-colors",
          isDark
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <RiMoonLine aria-hidden className="size-4" />
      </button>
    </div>
  )
}

/**
 * Compact single-icon switch for the header. Shows the theme you'd switch to:
 * a moon while light (tap → dark), a sun while dark (tap → light).
 */
export function ThemeButton({ className }: { className?: string }) {
  const { isDark, setTheme } = useMountedTheme()
  const label = isDark ? "Switch to light theme" : "Switch to dark theme"

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {isDark ? (
        <RiSunLine aria-hidden className="size-4" />
      ) : (
        <RiMoonLine aria-hidden className="size-4" />
      )}
    </button>
  )
}
