/**
 * Shown while an admin tab fetches, so switching between Clients / Users /
 * Add client paints a skeleton immediately instead of freezing on the previous
 * tab. Also gives <Link> something to prefetch.
 */
export default function AdminLoading() {
  return (
    <main
      className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-10"
      aria-busy="true"
    >
      <span className="sr-only">Loading…</span>

      <div className="flex flex-col gap-2">
        <div className="h-7 w-64 animate-pulse bg-muted" />
        <div className="h-4 w-96 animate-pulse bg-muted" />
      </div>

      <div className="flex gap-6 border-b border-border">
        <div className="h-8 w-24 animate-pulse border-b-2 border-foreground/20" />
        <div className="h-8 w-24 animate-pulse bg-muted" />
        <div className="h-8 w-28 animate-pulse bg-muted" />
      </div>

      <div className="h-14 animate-pulse border border-border bg-card" />
      <div className="h-72 animate-pulse border border-border bg-card" />
    </main>
  )
}
