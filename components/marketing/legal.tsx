import type { ReactNode } from "react"
import { RiShieldCheckLine } from "@remixicon/react"

import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import { Container } from "@/components/marketing/primitives"

/* Shared shell for the legal documents (terms, privacy, policies). */

export type LegalSection = {
  /** Anchor id — also used for the table-of-contents link. */
  id: string
  /** Section heading as it appears in the document. */
  title: string
  /** Section body, composed from <P>, <Bullets> and <Steps>. */
  body: ReactNode
}

/** A paragraph of document prose. */
export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

/** Unordered list with a hairline marker, matching the marketing language. */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2.5 h-px w-3.5 shrink-0 bg-foreground/25"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Ordered list with monospace numerals for criteria and conditions. */
export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="w-4 shrink-0 pt-px font-mono text-[11px] tabular-nums text-muted-foreground/60"
          >
            {i + 1}.
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

type LegalPageProps = {
  /** Parent grouping shown in the eyebrow, e.g. "Legal · Terms of Service". */
  eyebrow: string
  title: string
  /** Human-readable revision date, e.g. "September 10, 2026". */
  lastUpdated: string
  /** Preamble shown above the contents, before section one. */
  intro?: ReactNode
  sections: LegalSection[]
  /** Optional closing callout, highlighted in amber. */
  notice?: ReactNode
}

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
  notice,
}: LegalPageProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingNav />

      <main className="flex-1">
        <header className="border-b border-border">
          <Container className="py-16 md:py-20">
            <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              <span className="text-foreground/50">Onloz</span>
              <span aria-hidden className="h-px w-6 bg-border" />
              {eyebrow}
            </p>

            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
              {title}
            </h1>

            <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Last updated · {lastUpdated}
            </p>

            {intro && (
              <div className="mt-8 flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
                {intro}
              </div>
            )}
          </Container>
        </header>

        <Container className="py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <nav
              aria-label="Contents"
              className="self-start lg:sticky lg:top-24 lg:col-span-3"
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                Contents
              </p>
              <ol className="mt-5 flex max-h-[70svh] flex-col gap-1 overflow-y-auto pr-2">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 border-l border-transparent py-1 pl-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-[11px] tabular-nums text-muted-foreground/50"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex flex-col gap-12 lg:col-span-9">
              {sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 border-t border-border pt-8 first:border-t-0 first:pt-0"
                >
                  <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.01em] text-balance sm:text-[28px]">
                    {section.title}
                  </h2>
                  <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
                    {section.body}
                  </div>
                </section>
              ))}

              {notice && (
                <section className="border border-amber-400/50 bg-amber-400/5 p-6 md:p-8">
                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-amber-600 uppercase dark:text-amber-500">
                    <RiShieldCheckLine aria-hidden className="size-3.5" />
                    Important notice
                  </p>
                  <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
                    {notice}
                  </div>
                </section>
              )}
            </div>
          </div>
        </Container>
      </main>

      <MarketingFooter />
    </div>
  )
}
