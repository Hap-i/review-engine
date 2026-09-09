import { RiArrowRightLine, RiCheckLine } from "@remixicon/react"
import { Container, SectionLabel } from "@/components/marketing/primitives"

export function ForBusinessOwners() {
  return (
    <section
      id="for-businesses"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <Container className="py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index="07">For business owners</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
              You don&rsquo;t need more review requests. You need fewer reasons
              to ignore them.
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-relaxed text-muted-foreground">
              Most businesses already ask customers for reviews. The problem is
              that asking isn&rsquo;t enough.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col items-start justify-center gap-4 bg-background p-10 md:p-14">
            <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              Your customer opens Google
            </p>
            <div className="border border-border bg-card px-5 py-6">
              <p className="text-lg text-muted-foreground">
                Write a review&hellip;
              </p>
            </div>
            <p className="font-display text-xl text-muted-foreground italic sm:text-2xl">
              &hellip;and suddenly they have to think.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-5 border-t border-border bg-card p-10 md:p-14 lg:border-t-0 lg:border-l">
            <p className="font-mono text-[11px] tracking-[0.22em] text-foreground uppercase">
              Onloz gives them a starting point
            </p>
            <p className="text-base leading-relaxed text-foreground">
              That tiny reduction in effort can turn more customer experiences
              into written feedback.
            </p>
            <span aria-hidden className="flex gap-1.5 pt-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="size-1.5 rounded-full bg-amber-400" />
              ))}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

const RESTAURANT_TAGS = [
  { icon: "🍕", label: "Food" },
  { icon: "👨‍🍳", label: "Service" },
  { icon: "🏠", label: "Atmosphere" },
  { icon: "💰", label: "Value" },
]

export function ForRestaurants() {
  return (
    <section id="restaurants" className="scroll-mt-24 border-t border-border">
      <Container className="grid items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="08">For restaurants</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Perfect for restaurants, cafés and hospitality.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            After a meal, customers have plenty to say. Food. Service.
            Atmosphere. Speed. Value. Onloz gives them an effortless way to
            turn those thoughts into a review.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border border-border bg-card p-8 md:p-10">
            <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              What stood out?
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {RESTAURANT_TAGS.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 border border-foreground/25 px-4 py-2.5 text-sm"
                >
                  <span aria-hidden>{icon}</span>
                  {label}
                  <RiCheckLine aria-hidden className="size-4 text-amber-400" />
                </span>
              ))}
            </div>
            <p className="mt-8 flex items-center gap-2 border-t border-border pt-5 font-mono text-[11px] tracking-[0.18em] text-foreground uppercase">
              Review ready
              <RiArrowRightLine aria-hidden className="size-4 text-amber-400" />
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

const INDUSTRIES = [
  {
    icon: "🍽",
    title: "Restaurants & Cafés",
    body: "Make it easy for diners to describe what they enjoyed.",
  },
  {
    icon: "💇",
    title: "Salons & Spas",
    body: "Capture feedback about service, staff and experience.",
  },
  {
    icon: "🏨",
    title: "Hotels",
    body: "Help guests describe rooms, service and hospitality.",
  },
  {
    icon: "🚗",
    title: "Automotive",
    body: "Capture feedback about service quality and customer experience.",
  },
  {
    icon: "🏋️",
    title: "Fitness",
    body: "Make it easy for members to share their experience.",
  },
  {
    icon: "🦷",
    title: "Professional Services",
    body: "Help satisfied clients turn their experience into useful feedback.",
  },
]

export function OtherBusinessTypes() {
  return (
    <section
      id="industries"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index="09" className="justify-center">
            More industries
          </SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Works wherever customer experience matters.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map(({ icon, title, body }) => (
            <div key={title} className="flex flex-col gap-4 bg-card p-8 md:p-9">
              <span aria-hidden className="text-2xl">
                {icon}
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
