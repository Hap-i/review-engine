"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiDashboardLine, RiStoreLine } from "@remixicon/react"
import { logoutUser } from "@/app/portal/actions"
import { BrandMark } from "@/components/marketing/primitives"
import { homeHref } from "@/lib/site"
import { cn } from "@/lib/utils"

type PortalNavProps = {
  name: string
  email: string
}

const tabClass = {
  base: "-mb-px inline-flex items-center gap-1.5 border-b-2 px-1 pb-3 text-xs font-semibold uppercase tracking-widest transition-colors",
  idle: "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
  active: "border-foreground text-foreground",
}

export function PortalNav({ name, email }: PortalNavProps) {
  const pathname = usePathname()

  const isDashboard = pathname === "/portal"
  const isClients = pathname.startsWith("/portal/clients")

  return (
    <div className="border-b border-border bg-card">
      {/* Account row */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 pt-5 pb-5">
        <div className="flex min-w-0 items-center gap-4">
          <BrandMark href={homeHref()} className="shrink-0" />
          <div className="min-w-0 border-l border-border pl-4">
            <p className="truncate text-sm leading-tight font-semibold">
              {name}
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
        <form action={logoutUser} className="shrink-0">
          <button
            type="submit"
            className="inline-flex h-8 items-center justify-center border border-border bg-background px-3 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase hover:bg-muted hover:text-foreground"
          >
            Log out
          </button>
        </form>
      </div>

      {/* Tabs */}
      <nav
        aria-label="Portal sections"
        className="mx-auto flex w-full max-w-5xl gap-8 px-6"
      >
        <Link
          href="/portal"
          aria-current={isDashboard ? "page" : undefined}
          className={cn(
            tabClass.base,
            isDashboard ? tabClass.active : tabClass.idle
          )}
        >
          <RiDashboardLine className="size-4" />
          Dashboard
        </Link>
        <Link
          href="/portal/clients"
          aria-current={isClients ? "page" : undefined}
          className={cn(
            tabClass.base,
            isClients ? tabClass.active : tabClass.idle
          )}
        >
          <RiStoreLine className="size-4" />
          Clients
        </Link>
      </nav>
    </div>
  )
}
