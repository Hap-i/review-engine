import type { Metadata } from "next"

import { LoginForm } from "@/components/login-form"
import { BrandMark } from "@/components/marketing/primitives"
import { homeHref } from "@/lib/site"

/**
 * Kept out of the index by the X-Robots-Tag proxy.ts sets on every app-host
 * response, and by the Disallow in robots.ts. No per-page robots directive is
 * needed — this whole origin is opt-out.
 */
export const metadata: Metadata = {
  title: "Log in",
  description:
    "Sign in to Onloz to manage your clients and their review links.",
}

export default function PortalLoginPage() {
  return (
    <main className="flex min-h-svh flex-col bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-12">
        <section className="w-full max-w-sm border border-border bg-card p-6">
          <BrandMark href={homeHref()} className="mb-5" />
          <h1 className="text-xl font-bold tracking-tight">
            Business owner sign in
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Manage your clients and reviews. Your admin created this account.
          </p>
          <div className="mt-5">
            <LoginForm />
          </div>
        </section>
      </div>
      <footer className="px-6 pb-6 text-center">
        <a
          href={homeHref()}
          className="font-mono text-[11px] tracking-widest text-muted-foreground/70 uppercase transition-colors hover:text-foreground"
        >
          Back to Onloz home
        </a>
      </footer>
    </main>
  )
}
