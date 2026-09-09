import { RiMailLine, RiTimeLine } from "@remixicon/react"
import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import { CtaLink, Stars } from "@/components/marketing/primitives"
import { CONTACT_EMAIL } from "@/lib/site"

type ComingSoonProps = {
  /** Human name of the page, e.g. "Roadmap". */
  title: string
  /** Parent grouping shown in the eyebrow, e.g. "Product". */
  section: string
  /** One line describing what will live on the page. */
  note?: string
}

const DEFAULT_NOTE =
  "We’re working on it. Real content — guides, details and links — will live here soon."

export function ComingSoon({
  title,
  section,
  note = DEFAULT_NOTE,
}: ComingSoonProps) {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Onloz — ${title}`
  )}`

  return (
    <div className="flex min-h-svh flex-col">
      <MarketingNav />
      <main className="flex flex-1 items-center">
        <section className="w-full py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-6">
            <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              <span className="text-foreground/50">Onloz</span>
              <span aria-hidden className="h-px w-6 bg-border" />
              {section} · {title}
            </p>

            <div className="mt-10 flex flex-col gap-8 border border-dashed border-foreground/25 bg-card/60 p-8 md:p-12">
              <div className="flex items-start justify-between gap-6">
                <span className="inline-flex items-center gap-2 border border-amber-400/60 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-amber-500 uppercase dark:text-amber-600">
                  <RiTimeLine aria-hidden className="size-3.5" />
                  Coming soon
                </span>
                <Stars size="size-3.5" />
              </div>

              <div>
                <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {note}
                </p>
              </div>

              <p className="flex flex-col gap-3 border-t border-dashed border-foreground/15 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Have a question in the meantime?{" "}
                  <a
                    href={mailto}
                    className="inline-flex items-center gap-1.5 text-foreground underline underline-offset-4 hover:text-foreground/70"
                  >
                    <RiMailLine aria-hidden className="size-3.5" />
                    {CONTACT_EMAIL}
                  </a>
                </span>
              </p>
            </div>

            <div className="mt-10">
              <CtaLink href="/" variant="outline">
                Back to Onloz home
              </CtaLink>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
