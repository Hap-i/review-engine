/**
 * Shown while a portal page segment fetches, so tab switches paint a skeleton
 * immediately instead of freezing on the previous screen. Also gives <Link>
 * something to prefetch, which dynamic routes otherwise skip.
 */
export default function PortalLoading() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true">
      <span className="sr-only">Loading…</span>

      <div className="flex flex-col gap-2">
        <div className="h-7 w-40 animate-pulse bg-muted" />
        <div className="h-4 w-64 animate-pulse bg-muted" />
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="h-24 animate-pulse border border-border bg-card" />
        <div className="h-24 animate-pulse border border-border bg-card" />
      </section>

      <div className="h-64 animate-pulse border border-border bg-card" />
    </div>
  )
}
