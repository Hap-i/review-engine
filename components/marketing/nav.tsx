"use client"

import Link from "next/link"
import { useState } from "react"
import { RiMenuLine, RiCloseLine } from "@remixicon/react"
import { cn } from "@/lib/utils"
import { signInHref } from "@/lib/site"
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <BrandMark />

        {/* Desktop links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
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

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={signInHref()}
            className="inline-flex h-9 items-center px-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <a
            href="/#pricing"
            className="inline-flex h-9 items-center border border-foreground bg-foreground px-4 font-mono text-[11px] font-semibold tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-85"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
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

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-border transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[26rem]" : "max-h-0 border-t-0"
        )}
      >
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
          <div className="flex items-center gap-3 px-6 py-5">
            <a
              href={signInHref()}
              className="inline-flex h-10 flex-1 items-center justify-center border border-border font-mono text-[11px] tracking-[0.18em] text-foreground uppercase"
            >
              Log in
            </a>
            <a
              href="/#pricing"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 flex-1 items-center justify-center border border-foreground bg-foreground font-mono text-[11px] font-semibold tracking-[0.18em] text-background uppercase"
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
