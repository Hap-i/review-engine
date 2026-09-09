import { RiKeyboardLine, RiStarLine, RiWalkLine } from "@remixicon/react"
import { Container, SectionLabel, Stars } from "@/components/marketing/primitives"

const LOST_MOMENTS = [
  {
    icon: RiStarLine,
    title: "They leave a rating",
    body: "Your customer had a great experience — but doesn’t know what to write.",
  },
  {
    icon: RiKeyboardLine,
    title: "The blank box kills momentum",
    body: "Starting a review from scratch feels like work.",
  },
  {
    icon: RiWalkLine,
    title: "They move on",
    body: "A few seconds later, they’ve closed the page and gone back to their day.",
  },
]

export function Problem() {
  return (
    <section
      id="problem"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <Container className="py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionLabel index="01">The problem</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
              Your customers are happy. They&rsquo;re just busy.
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              You already have customers who are willing to recommend you.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The problem? They don&rsquo;t have five minutes to write the
              perfect review. So they leave a rating&hellip;{" "}
              <span className="text-foreground">and nothing else.</span>
            </p>
          </div>
        </div>

        {/* The "and nothing else" moment */}
        <div className="mt-20 flex flex-col items-center border border-border bg-background px-6 py-14 text-center md:py-16">
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            What a happy customer often leaves
          </p>
          <Stars className="mt-6" size="size-8" />
          <p className="mt-6 font-display text-2xl font-medium text-muted-foreground italic sm:text-3xl">
            &hellip;and nothing else.
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            That means you&rsquo;re missing the words that help future
            customers understand what people actually loved about your
            business.
          </p>
        </div>

        {/* Three lost moments */}
        <div className="mt-6 grid border border-border bg-card md:grid-cols-3">
          {LOST_MOMENTS.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className={
                "flex flex-col gap-5 p-8 md:p-10" +
                (i > 0 ? " border-t border-border md:border-t-0 md:border-l" : "")
              }
            >
              <span className="inline-flex size-12 items-center justify-center border border-border bg-background">
                <Icon aria-hidden className="size-5 text-amber-400" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
              <p aria-hidden className="mt-auto font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50">
                /0{i + 1}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-20 text-center font-display text-3xl leading-tight font-semibold tracking-[-0.01em] text-balance sm:text-4xl">
          Onloz removes the blank page.
        </p>
      </Container>
    </section>
  )
}

const SOLUTION_STEPS = [
  {
    index: "1",
    title: "They choose what mattered",
    body: "Customers tap the things that stood out — food, service, value. No paragraph required.",
  },
  {
    index: "2",
    title: "Onloz writes naturally",
    body: "Their rating and choices become clear, natural language in your brand’s voice.",
  },
  {
    index: "3",
    title: "They review, then post",
    body: "The customer reads and edits the draft, then continues straight to your review page.",
  },
]

export function Solution() {
  return (
    <section id="solution" className="scroll-mt-24 border-t border-border">
      <Container className="grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="02">Meet Onloz</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            From &ldquo;5 stars&rdquo; to a real review in seconds.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Onloz gives customers a simple way to describe what stood out about
            their experience. No blank page. No lengthy form. No complicated
            process.
          </p>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {SOLUTION_STEPS.map((step, i) => (
            <li
              key={step.index}
              className={
                "grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 last:border-b md:gap-10" +
                (i > 0 ? "" : " first:border-t-0")
              }
            >
              <span className="font-display text-3xl font-light text-amber-400">
                {step.index}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
