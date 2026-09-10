import type { Metadata } from "next"
import { RiCheckLine, RiCompassLine, RiTimeLine } from "@remixicon/react"

import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import {
  Container,
  CtaLink,
  SectionLabel,
} from "@/components/marketing/primitives"
import { CONTACT_EMAIL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Roadmap — Onloz",
  description:
    "What’s next on Onloz — review automation, WhatsApp review reminders and an advanced CRM, plus what’s already shipping today.",
}

type Status = "available" | "building" | "next" | "exploring"

const STATUS: Record<
  Status,
  { label: string; icon: typeof RiCheckLine; className: string }
> = {
  available: {
    label: "Available",
    icon: RiCheckLine,
    className:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  building: {
    label: "In progress",
    icon: RiTimeLine,
    className:
      "border-amber-400/50 bg-amber-400/10 text-amber-600 dark:text-amber-500",
  },
  next: {
    label: "Up next",
    icon: RiTimeLine,
    className: "border-foreground/25 bg-muted text-muted-foreground",
  },
  exploring: {
    label: "Exploring",
    icon: RiCompassLine,
    className: "border-border bg-card/60 text-muted-foreground/80",
  },
}

type Item = {
  title: string
  body: string
  status: Status
}

type Stage = {
  id: string
  index: string
  label: string
  blurb: string
  items: Item[]
}

const STAGES: Stage[] = [
  {
    id: "available",
    index: "01",
    label: "Available today",
    blurb: "Live in the product and in use by early businesses.",
    items: [
      {
        title: "Feedback-to-draft flow",
        body: "A customer taps what stood out, gets a real draft back, and edits it before anything is published.",
        status: "available",
      },
      {
        title: "QR codes and links",
        body: "One code per location or campaign, ready for receipts, tables, packaging or thank-you cards.",
        status: "available",
      },
      {
        title: "Custom questions and categories",
        body: "Configure the feedback prompts around your own customer experience instead of a generic template.",
        status: "available",
      },
      {
        title: "Multi-location support",
        body: "Cover several branches under one business, with feedback reported per location.",
        status: "available",
      },
    ],
  },
  {
    id: "next",
    index: "02",
    label: "Up next",
    blurb:
      "Actively being designed and built. This is where most of the work is going right now.",
    items: [
      {
        title: "Review automation",
        body: "Trigger the review request automatically after a real customer interaction — a closed bill, a completed booking, a delivered order — instead of relying on staff to remember. Timing, follow-ups and stop rules are configurable, and a customer who has already left feedback is never asked twice.",
        status: "building",
      },
      {
        title: "WhatsApp review reminders",
        body: "Send the ask and the follow-up reminder over WhatsApp, where most customers actually read their messages. Opt-in and consent handling is built in from the start, along with the ability to opt out from the first message.",
        status: "building",
      },
      {
        title: "Advanced CRM",
        body: "A real customer record behind each request: contact history, which requests were sent and when, feedback left, current follow-up status, and tags or segments so you can target the right customers. Turns one-off review collection into something you can actually manage over time.",
        status: "next",
      },
    ],
  },
  {
    id: "later",
    index: "03",
    label: "Exploring",
    blurb:
      "Directions we’re researching. Directionally right, not yet scheduled.",
    items: [
      {
        title: "More review destinations",
        body: "Broader support for the platforms businesses already ask customers to use.",
        status: "exploring",
      },
      {
        title: "Deeper feedback analytics",
        body: "Themes and trends across feedback over time, not just a list of responses.",
        status: "exploring",
      },
      {
        title: "Team roles and permissions",
        body: "Separate access for owners, managers and staff across locations.",
        status: "exploring",
      },
      {
        title: "POS and booking integrations",
        body: "Pull customer interactions straight from the systems a business already runs on.",
        status: "exploring",
      },
    ],
  },
]

export default function RoadmapPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <MarketingNav />

      <main className="flex-1">
        <header className="border-b border-border">
          <Container className="py-16 md:py-20">
            <SectionLabel>Product · Roadmap</SectionLabel>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
              Where Onloz is headed.
            </h1>
            <div className="mt-8 flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                A public look at what we’re building — so you always know where
                the product is going before you commit to it. Items move between
                stages as we learn from the businesses using Onloz.
              </p>
              <p>
                Every item here is built to make an honest review easier to give
                and easier to act on. Nothing on this list is designed to make a
                review easier to manufacture.
              </p>
            </div>
          </Container>
        </header>

        {STAGES.map((stage) => (
          <section key={stage.id} className="border-b border-border">
            <Container className="py-20 md:py-24">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <SectionLabel index={stage.index}>{stage.label}</SectionLabel>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {stage.blurb}
                  </p>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  {stage.items.map((item) => {
                    const status = STATUS[item.status]
                    const Icon = status.icon

                    return (
                      <article
                        key={item.title}
                        className="border-t border-border py-8 first:border-t-0 first:pt-0 last:pb-0"
                      >
                        <span
                          className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase ${status.className}`}
                        >
                          <Icon aria-hidden className="size-3.5" />
                          {status.label}
                        </span>
                        <h2 className="mt-4 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                          {item.title}
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </article>
                    )
                  })}
                </div>
              </div>
            </Container>
          </section>
        ))}

        <section>
          <Container className="py-20 md:py-28">
            <div className="border border-border bg-card/60 p-8 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                    Shaping the roadmap
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.01em] text-balance sm:text-3xl">
                    Running a business this would help?
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Tell us how your customers actually reach you — walk-ins,
                    bookings, deliveries, WhatsApp — and we’ll factor it into
                    what we build next.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <CtaLink
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      "Onloz roadmap feedback"
                    )}`}
                  >
                    Send feedback
                  </CtaLink>
                  <CtaLink href="/#pricing" variant="outline">
                    See pricing
                  </CtaLink>
                </div>
              </div>

              <p className="mt-8 border-t border-border pt-6 text-[11px] leading-relaxed text-muted-foreground">
                This roadmap is indicative and provided for information only. It
                is not a commitment, warranty, or guarantee that any feature
                will be released, or released on any particular timeline. We may
                change, delay, or cancel items as the product and applicable
                platform policies evolve.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
