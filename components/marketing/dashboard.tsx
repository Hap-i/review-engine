import { RiArrowUpLine, RiLineChartLine } from "@remixicon/react"
import { Container, SectionLabel } from "@/components/marketing/primitives"

const METRICS = [
  { label: "Customers reached", value: "1,284" },
  { label: "Started", value: "734" },
  { label: "Completed", value: "521" },
  { label: "Completion rate", value: "71%", accent: true },
]

const MENTIONS = [
  { label: "Food", pct: 68 },
  { label: "Service", pct: 54 },
  { label: "Quality", pct: 42 },
  { label: "Delivery", pct: 31 },
  { label: "Value", pct: 27 },
]

export function Dashboard() {
  return (
    <section id="dashboard" className="scroll-mt-24 border-t border-border bg-muted/40">
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="11" className="justify-center">
            Business dashboard
          </SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Know what&rsquo;s happening after you ask for a review.
          </h2>
        </div>

        {/* Analytics panel */}
        <div className="mt-16 grid border border-border bg-card lg:grid-cols-[1fr_1fr]">
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-semibold tracking-tight">
                Customer Feedback
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                <RiLineChartLine aria-hidden className="size-4 text-amber-400" />
                Last 30 days
              </span>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              {METRICS.map(({ label, value, accent }) => (
                <div key={label}>
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    {label}
                  </dt>
                  <dd
                    className={
                      "mt-1.5 font-display text-4xl font-semibold tracking-tight " +
                      (accent ? "flex items-center gap-2" : "")
                    }
                  >
                    {value}
                    {accent && (
                      <span className="inline-flex items-center gap-0.5 rounded-none bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                        <RiArrowUpLine aria-hidden className="size-3" />
                        goal met
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col justify-center border-t border-border p-8 md:p-12 lg:border-t-0 lg:border-l">
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              What customers mention
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {MENTIONS.map(({ label, pct }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="w-20 font-mono text-[11px] tracking-[0.12em] text-foreground uppercase">
                    {label}
                  </span>
                  <span
                    aria-hidden
                    className="relative h-2.5 flex-1 overflow-hidden bg-muted"
                  >
                    <span
                      className="absolute inset-y-0 left-0 bg-foreground"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-8 text-right font-mono text-xs text-muted-foreground">
                    {pct}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-border pt-4 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
              Example data — every mention is customer-chosen, never invented.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h3 className="font-display text-3xl leading-tight font-semibold tracking-[-0.01em] text-balance sm:text-4xl">
            Turn customer feedback into business insight.
          </h3>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Onloz isn&rsquo;t only about reviews. Your customers are telling you
            what they love — and where you can improve.
          </p>
        </div>
      </Container>
    </section>
  )
}
