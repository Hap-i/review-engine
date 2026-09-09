import {
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiGoogleFill,
  RiSparklingLine,
  RiStarFill,
  RiTimeLine,
} from "@remixicon/react"
import { Container, CtaLink, SectionLabel, Stars } from "@/components/marketing/primitives"

const TAGS = [
  "Food",
  "Service",
  "Delivery",
  "Quality",
  "Value",
  "Staff",
  "Atmosphere",
]

const STEPS = [
  {
    icon: RiStarFill,
    step: "Step 1",
    title: "Rate your experience",
    body: "Customers start with the rating that reflects their actual experience.",
    foot: "1 → 5 stars",
  },
  {
    icon: RiCheckboxCircleFill,
    step: "Step 2",
    title: "Tell us what stood out",
    body: "Instead of writing a paragraph, customers quickly select the things that mattered to them.",
    foot: "Tap, or add your own words",
  },
  {
    icon: RiSparklingLine,
    step: "Step 3",
    title: "Get a polished review",
    body: "Onloz turns their feedback into a natural review they can read, edit and approve.",
    foot: "Read · edit · approve",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index="03" className="justify-center">
            How it works
          </SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Three taps. One genuine review.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Customers keep their real words. Onloz supplies the structure and
            the polish.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, step, title, body, foot }, i) => (
            <article
              key={step}
              className="relative flex flex-col gap-5 border border-border bg-background p-8 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-12 items-center justify-center border border-border">
                  <Icon aria-hidden className="size-5 text-amber-400" />
                </span>
                <span aria-hidden className="font-mono text-6xl font-light text-foreground/[0.06]">
                  {i + 1}
                </span>
              </div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-foreground uppercase">
                {step}
              </p>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
              <p className="mt-auto border-t border-border pt-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {foot}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {TAGS.join("  ·  ")}
          </p>
          <p className="text-sm text-muted-foreground">
            They can add their own words too — but they don&rsquo;t have to.
          </p>
          <div className="mt-4">
            <CtaLink href="#pricing">Try Onloz Free</CtaLink>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ThoughtBubble({ children }: { children: React.ReactNode }) {
  return (
    <p className="relative mx-auto max-w-xs rounded-none border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground italic">
      “{children}”
    </p>
  )
}

export function BeforeAfter() {
  return (
    <section id="before-after" className="scroll-mt-24 border-t border-border">
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index="04" className="justify-center">
            Before / after
          </SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            The difference is surprisingly small.
          </h2>
        </div>

        <div className="mt-16 grid border border-border bg-card lg:grid-cols-2">
          {/* Before */}
          <div className="flex flex-col gap-6 p-8 md:p-12">
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              <span aria-hidden className="h-px w-6 bg-border" />
              Before
            </p>
            <div className="flex flex-col gap-5">
              <div className="border border-border bg-background px-4 py-5">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Customer sees
                </p>
                <p className="mt-2 text-base text-muted-foreground">
                  Write a review&hellip;
                </p>
              </div>
              <ThoughtBubble>I’ll do it later.</ThoughtBubble>
            </div>
            <div className="mt-auto border-t border-border pt-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Result
              </p>
              <Stars className="mt-2" />
              <p className="mt-2 font-display text-xl text-muted-foreground italic">
                No written feedback.
              </p>
            </div>
          </div>

          {/* With Onloz */}
          <div className="flex flex-col gap-6 border-t border-border p-8 md:p-12 lg:border-t-0 lg:border-l">
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-foreground uppercase">
              <span aria-hidden className="h-px w-6 bg-amber-400" />
              With Onloz
            </p>
            <div className="flex flex-col gap-5">
              <div className="border border-foreground/20 bg-background px-4 py-5">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Customer sees
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Food ✓", "Service ✓", "Quality ✓"].map((t) => (
                    <span
                      key={t}
                      className="border border-foreground bg-foreground px-2 py-0.5 text-[11px] text-background"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-amber-400 pl-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Onloz writes
                </p>
                <p className="mt-2 font-display text-base leading-relaxed text-foreground italic">
                  “Really happy with the food, service and overall quality.
                  Everything was smooth and enjoyable. Would definitely
                  recommend.”
                </p>
              </div>
              <p className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-foreground uppercase">
                Customer: looks good
                <RiArrowRightLine aria-hidden className="size-3.5" />
                <RiGoogleFill aria-hidden className="size-3.5" />
                Google
              </p>
            </div>
            <div className="mt-auto border-t border-border pt-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Result
              </p>
              <div className="mt-2 flex items-center gap-2">
                <RiTimeLine aria-hidden className="size-4 text-amber-400" />
                <p className="font-display text-xl text-foreground">
                  A written review, while it’s fresh.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center font-display text-2xl leading-snug font-semibold tracking-[-0.01em] text-balance sm:text-3xl">
          You don&rsquo;t need customers to become writers. You just need to
          make sharing their experience easy.
        </p>
      </Container>
    </section>
  )
}
