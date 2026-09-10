import type { Metadata } from "next"
import { RiMapPinLine, RiStarFill } from "@remixicon/react"

import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import {
  Container,
  CtaLink,
  SectionLabel,
} from "@/components/marketing/primitives"
import { CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = {
  title: "About — Onloz",
  description:
    "Why Onloz exists, what we’re building toward, and the founder behind it — Suvendu Sekhar Sahoo, based in Bangalore, India.",
}

const PRINCIPLES = [
  {
    title: "The customer provides the experience",
    body: "We help with the words. The rating, the details and the decision to publish come from the person who was actually there.",
  },
  {
    title: "Honest includes negative",
    body: "A genuine complaint is still genuine feedback. We build for real experiences, not for a particular average rating.",
  },
  {
    title: "Software, not a review platform",
    body: "Onloz is a technology provider. We don’t host reviews, we don’t moderate them, and we don’t control what Google or anyone else decides to publish.",
  },
  {
    title: "No manufactured sentiment",
    body: "If a feature would only make sense for reviews that didn’t happen, we don’t want to build it. That line is written into our Acceptable Use Policy.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingNav />

      <main className="flex-1">
        {/* Header */}
        <header className="border-b border-border">
          <Container className="py-16 md:py-20">
            <SectionLabel>Company · About</SectionLabel>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
              Most customers had something to say. They just didn’t say it.
            </h1>
            <div className="mt-8 flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                The people who had a good experience rarely write anything down.
                A blank review box asks for more effort than the moment
                deserves, so it stays empty. The reviews that do get written
                tend to come from the outliers — the delighted, or the
                disappointed.
              </p>
              <p>
                Onloz started from a narrow question: what if the writing was no
                longer the hard part? If a customer could tap what stood out and
                get a real draft back, more of them would say what they actually
                thought.
              </p>
              <p>
                That’s the whole product. Less friction between a real
                experience and the words for it.
              </p>
            </div>
          </Container>
        </header>

        {/* Motto */}
        <section className="border-b border-border bg-muted/40">
          <Container className="py-20 text-center md:py-28">
            <p className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              <RiStarFill aria-hidden className="size-3.5 text-amber-400" />
              Our motto
            </p>
            <p className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-[1.15] font-semibold tracking-[-0.01em] text-balance italic sm:text-5xl">
              Make honest feedback easy to give.
            </p>
          </Container>
        </section>

        {/* Mission and goal */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel index="01">Mission &amp; goal</SectionLabel>
              </div>

              <div className="flex flex-col gap-12 lg:col-span-7 lg:col-start-6">
                <div className="flex flex-col gap-4">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] sm:text-[28px]">
                    Our mission
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    To make it easier for a real customer to share a real
                    experience — and to give the business on the other side an
                    honest picture of what those experiences actually were.
                  </p>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Both halves matter. A business that hears only from its
                    happiest customers isn’t being told anything useful. The
                    point is a wider, more truthful sample — not a flattering
                    one.
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-border pt-12">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] sm:text-[28px]">
                    Our goal
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    To become the simplest way for a customer-facing business to
                    hear from the people it serves — without manufacturing a
                    single review to get there.
                  </p>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Concretely, that means removing the friction at each step:
                    the ask, the writing, the edit, and the decision to publish.
                    Every part of the product is measured against one question —
                    did this make an honest review more likely to exist?
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Founder */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel index="02">Founder</SectionLabel>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-7 lg:col-start-6">
                <div className="flex flex-col gap-4">
                  <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] sm:text-4xl">
                    Suvendu Sekhar Sahoo
                  </h2>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    <span>Founder</span>
                    <span
                      aria-hidden
                      className="hidden h-px w-4 bg-border sm:block"
                    />
                    <span className="inline-flex items-center gap-1.5">
                      <RiMapPinLine aria-hidden className="size-3.5" />
                      Bangalore, India
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
                  <p>
                    Onloz is built by Suvendu Sekhar Sahoo, a founder based in
                    Bangalore, India.
                  </p>
                  <p>
                    The problem is not that customers have nothing to say. It’s
                    that asking them to write it down from scratch loses most of
                    them. Watching that happen to businesses that genuinely
                    cared about their customers is what made the case for
                    building Onloz.
                  </p>
                  <p>
                    The approach is deliberately conservative. Customers stay in
                    control of what they publish. Nothing is posted on their
                    behalf. And the rules that keep the service honest are
                    written down and published, not left to good intentions —
                    you’ll find them in our{" "}
                    <a
                      href="/terms"
                      className="text-foreground underline underline-offset-4 hover:text-foreground/70"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/acceptable-use"
                      className="text-foreground underline underline-offset-4 hover:text-foreground/70"
                    >
                      Acceptable Use Policy
                    </a>
                    .
                  </p>
                  <p>
                    If you’re building something customer-facing and want to
                    talk about how Onloz would work for you,{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-foreground underline underline-offset-4 hover:text-foreground/70"
                    >
                      {CONTACT_EMAIL}
                    </a>{" "}
                    reaches the founder directly.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Principles */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel index="03">What we build by</SectionLabel>
                <h2 className="mt-6 font-display text-3xl leading-[1.1] font-semibold tracking-[-0.01em] text-balance sm:text-4xl">
                  Four rules we don’t trade away.
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
                  These sit behind every product decision, including the ones
                  that would have been more profitable otherwise.
                </p>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                {PRINCIPLES.map((principle, i) => (
                  <div
                    key={principle.title}
                    className="border-t border-border py-7 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <p
                      aria-hidden
                      className="font-mono text-[11px] text-muted-foreground/50 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section>
          <Container className="py-24 md:py-32">
            <div className="border border-border bg-card/60 p-8 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-balance sm:text-3xl">
                    Onloz is invite-only while we onboard early businesses.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Tell us about your business and where your customers already
                    interact with you. We’ll get back to you about access.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <CtaLink
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      "Onloz early access request"
                    )}`}
                  >
                    Request access
                  </CtaLink>
                  <CtaLink href="/roadmap" variant="outline">
                    See the roadmap
                  </CtaLink>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
