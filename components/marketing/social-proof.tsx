import { Container, SectionLabel } from "@/components/marketing/primitives"

export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index="13" className="justify-center">
            Social proof
          </SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Built for businesses that care about customer feedback.
          </h2>
        </div>

        {/* Placeholder testimonial slot — swap in real stories. */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-6 border border-dashed border-foreground/25 bg-card/60 px-8 py-16 text-center">
          <span aria-hidden className="font-display text-7xl leading-none text-foreground/10">
            &ldquo;
          </span>
          <p className="font-display text-2xl leading-snug font-medium text-muted-foreground italic sm:text-3xl">
            Your customers&rsquo; words will live here — once you&rsquo;ve
            collected your first real stories.
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            — Your business · Location
          </p>
        </div>

        {/* Metric placeholders — never show numbers without real data. */}
        <div className="mt-6 grid gap-px overflow-hidden border border-dashed border-foreground/25 bg-border/60 sm:grid-cols-3">
          {[
            "+37% review completion",
            "2.4× more written feedback",
            "1,200+ experiences processed",
          ].map((metric) => (
            <div
              key={metric}
              className="flex items-center justify-center bg-background px-6 py-8 text-center font-mono text-[11px] tracking-[0.14em] text-muted-foreground/70 uppercase"
            >
              {metric}
            </div>
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70 uppercase">
          Real numbers appear here as soon as you have the data.
        </p>
      </Container>
    </section>
  )
}
