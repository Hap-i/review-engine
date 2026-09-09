"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import { signInHref } from "@/lib/site"
import { ThemeButton, ThemeToggle } from "@/components/theme-toggle"
import { BrandMark } from "@/components/marketing/primitives"

const NAV_ITEMS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "For Businesses", href: "/#for-businesses" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
]

export function MarketingNav() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Close the mobile menu on outside taps and on Escape.
  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-6">
        <BrandMark className="shrink-0" />

        {/* Desktop links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:ml-12 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster: actions + menu toggle */}
        <div className="ml-auto flex items-center gap-2.5">
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeButton />
            <Link
              href={signInHref()}
              className="inline-flex h-9 items-center px-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex h-9 items-center border border-foreground bg-foreground px-4 font-mono text-[11px] font-semibold tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-85"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center border border-border bg-background text-foreground lg:hidden"
          >
            {open ? (
              <RiCloseLine aria-hidden className="size-5" />
            ) : (
              <RiMenuLine aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — mounted only while open */}
      {open && (
        <div id="mobile-menu" className="border-t border-border lg:hidden">
          <nav aria-label="Primary (mobile)" className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border px-6 py-4 font-mono text-[11px] tracking-[0.18em] text-foreground uppercase last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Theme
              </span>
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-3 px-6 py-5">
              <a
                href={signInHref()}
                className="inline-flex h-10 flex-1 items-center justify-center border border-border font-mono text-[11px] tracking-[0.18em] text-foreground uppercase"
              >
                Log in
              </a>
              <Link
                href="/#pricing"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 flex-1 items-center justify-center border border-foreground bg-foreground font-mono text-[11px] font-semibold tracking-[0.18em] text-background uppercase"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
