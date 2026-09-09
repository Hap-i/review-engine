import Link from "next/link"
import type { ReactNode } from "react"
import { RiArrowRightLine, RiStarFill } from "@remixicon/react"
import { cn } from "@/lib/utils"

/* Shared building blocks for the Onloz marketing page. */

export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </div>
  )
}

/** Small monospace uppercase label, optionally preceded by a section number. */
export function SectionLabel({
  children,
  index,
  className,
}: {
  children: ReactNode
  index?: string
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase",
        className
      )}
    >
      {index && <span className="text-foreground/50">{index}</span>}
      <span aria-hidden className="h-px w-6 bg-border" />
      <span>{children}</span>
    </p>
  )
}

/** Five-star row. Uses amber so it reads on both light and dark surfaces. */
export function Stars({
  value = 5,
  className,
  size = "size-4",
}: {
  value?: number
  className?: string
  size?: string
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <RiStarFill
          key={i}
          aria-hidden
          className={cn(
            size,
            i <= value ? "text-amber-400" : "text-foreground/15"
          )}
        />
      ))}
    </div>
  )
}

/** The Onloz wordmark: serif display type with a star as the full stop. */
export function BrandMark({
  className,
  href = "/",
}: {
  className?: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-baseline gap-1.5 rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      aria-label="Onloz — home"
    >
      <span className="font-display text-2xl leading-none font-semibold tracking-tight">
        Onloz
      </span>
      <RiStarFill
        aria-hidden
        className="size-2.5 self-center text-amber-400 transition-transform duration-300 group-hover:rotate-90"
      />
    </Link>
  )
}

const ctaBase =
  "group/cta inline-flex items-center justify-center gap-2.5 border px-6 py-3.5 font-mono text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const ctaVariants = {
  primary:
    "border-foreground bg-foreground text-background hover:bg-foreground/85 active:translate-y-px",
  outline:
    "border-border bg-card/50 text-foreground hover:border-foreground/40 hover:bg-muted active:translate-y-px",
  ghost:
    "border-transparent bg-transparent text-foreground underline-offset-4 hover:underline",
}

export function CtaLink({
  href,
  variant = "primary",
  className,
  children,
  arrow = true,
}: {
  href: string
  variant?: keyof typeof ctaVariants
  className?: string
  children: ReactNode
  arrow?: boolean
}) {
  return (
    <a
      href={href}
      className={cn(ctaBase, ctaVariants[variant], className)}
    >
      <span>{children}</span>
      {arrow && (
        <RiArrowRightLine
          aria-hidden
          className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
        />
      )}
    </a>
  )
}
