import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function PortalLoginPage() {
  return (
    <main className="flex min-h-svh flex-col bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-12">
        <section className="w-full max-w-sm border border-border bg-card p-6">
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
        <Link
          href="/"
          className="text-[11px] tracking-widest text-muted-foreground/70 uppercase hover:text-foreground"
        >
          Review Engine
        </Link>
      </footer>
    </main>
  )
}
