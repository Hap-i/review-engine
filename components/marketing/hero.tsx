import {
  RiArrowRightLine,
  RiCheckLine,
  RiEditLine,
  RiGoogleFill,
  RiStarFill,
} from "@remixicon/react"
import { Container, CtaLink, Stars } from "@/components/marketing/primitives"
import { ProductHuntBadge } from "@/components/marketing/product-hunt-badge"

const CHIPS = ["Food", "Service", "Delivery", "Quality", "Value", "Atmosphere"]
const SELECTED = ["Food", "Service", "Delivery"]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Warm glow behind the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20rem] left-1/2 h-[38rem] w-[60rem] -translate-x-1/2 rounded-full bg-amber-200/45 blur-3xl dark:bg-amber-400/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <Container className="grid items-center gap-16 py-16 md:py-24 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="rise inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] text-foreground uppercase">
            <RiStarFill aria-hidden className="size-3.5 text-amber-400" />
            Turn customer feedback into reviews
          </p>

          <h1 className="rise mt-6 font-display text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.02em] text-balance sm:text-6xl md:text-[4.25rem]">
            More customers have something to say. Make it easy for them to say
            it.
          </h1>

          <p className="rise mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Onloz helps customers turn their genuine experience into a polished
            review in seconds — without staring at a blank text box.
          </p>
          <p className="rise mt-3 font-mono text-[11px] tracking-[0.18em] text-foreground uppercase">
            Less typing. More reviews. Less friction.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "140ms" }}
          >
            <CtaLink href="#pricing">Start Free</CtaLink>
            <CtaLink href="#how-it-works" variant="outline">
              See How It Works
            </CtaLink>
          </div>

          <p
            className="rise mt-7 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
            style={{ animationDelay: "220ms" }}
          >
            No credit card required&ensp;·&ensp;Set up in minutes&ensp;·&ensp;
            Works with Google Reviews
          </p>

          <div className="rise mt-8" style={{ animationDelay: "260ms" }}>
            <ProductHuntBadge />
          </div>
        </div>

        {/* Phone mock */}
        <div
          className="rise relative mx-auto w-full max-w-[20rem] sm:max-w-[21rem]"
          style={{ animationDelay: "200ms" }}
        >
          <div className="rounded-[2.6rem] border border-border bg-card p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] dark:border-white/10">
            <div className="overflow-hidden rounded-[2.1rem] border border-border bg-background">
              <PhoneFlow />
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <span>5 sec</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span className="text-amber-400">Feedback</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span>Review</span>
          </p>
        </div>
      </Container>
    </section>
  )
}

function PhoneFlow() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <span className="font-display text-lg font-semibold tracking-tight">
          The Corner Café
        </span>
        <Stars size="size-3" />
      </div>

      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Rating */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.24em] text-muted-foreground uppercase">
            How was your experience?
          </p>
          <div className="mt-3 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <RiStarFill
                key={i}
                aria-hidden
                className="size-7 text-amber-400"
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-foreground">Excellent — 5 stars</p>
        </div>

        {/* Highlights */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.24em] text-muted-foreground uppercase">
            What stood out?
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {CHIPS.map((chip) => {
              const on = SELECTED.includes(chip)
              return (
                <span
                  key={chip}
                  className={
                    on
                      ? "inline-flex items-center gap-1 border border-foreground bg-foreground px-2 py-1 text-[10px] text-background"
                      : "inline-flex items-center gap-1 border border-foreground/20 px-2 py-1 text-[10px] text-muted-foreground"
                  }
                >
                  {on && <RiCheckLine aria-hidden className="size-3" />}
                  {chip}
                </span>
              )
            })}
          </div>
        </div>

        {/* Draft review */}
        <div className="relative border-l-2 border-amber-400/70 pl-4">
          <p className="font-display text-[15px] leading-relaxed text-foreground italic">
            “Really enjoyed the food and the service. Everything was smooth
            from start to finish. Great experience overall!”
          </p>
          <p className="mt-2 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
            <RiEditLine aria-hidden className="size-3" />
            Your draft — read, edit, approve
          </p>
        </div>

        {/* Continue */}
        <div className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-3 py-3 font-mono text-[10px] font-semibold tracking-[0.2em] text-background uppercase">
          <RiGoogleFill aria-hidden className="size-4" />
          Continue to Google
        </div>
      </div>

      <p className="flex items-center justify-center gap-1.5 border-t border-border px-5 py-3 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/80 uppercase">
        <RiArrowRightLine aria-hidden className="size-3" />
        Already copied to your clipboard
      </p>
    </div>
  )
}
