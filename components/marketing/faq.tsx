import { RiStarFill } from "@remixicon/react"
import { Container, CtaLink, SectionLabel } from "@/components/marketing/primitives"

const FAQS = [
  {
    q: "What is Onloz?",
    a: "Onloz is an AI-powered customer feedback and review-writing platform that helps customers turn their genuine experiences into polished review text.",
  },
  {
    q: "Does Onloz create fake reviews?",
    a: "No. Onloz is designed to help customers express their own experiences. Customers provide the rating and feedback, and AI helps turn that information into natural language. Businesses must not use Onloz to create fabricated, misleading, incentivized or manipulated reviews.",
  },
  {
    q: "Does Onloz guarantee Google reviews?",
    a: "No. Onloz cannot guarantee that Google or another review platform will publish, retain, rank or display a review. Review platforms independently apply their own policies and moderation systems. Google states that reviews must reflect genuine experiences and may remove reviews that violate its policies.",
  },
  {
    q: "Can customers edit the AI-generated review?",
    a: "Yes. We recommend giving customers the opportunity to review and edit their generated text before publishing.",
  },
  {
    q: "Does the customer have to use Google?",
    a: "Not necessarily. Your business can configure the destination appropriate for your workflow.",
  },
  {
    q: "Can I use Onloz with a QR code?",
    a: "Yes. You can place your Onloz QR code wherever customers interact with your business — such as receipts, tables, packaging or thank-you cards.",
  },
  {
    q: "Does Onloz work for multiple locations?",
    a: "Yes. Onloz can cover several locations for one business. If you run more than one, tell us how many when you request access and we’ll make sure the experience fits.",
  },
  {
    q: "Can I customize the questions?",
    a: "Yes. Businesses can configure the feedback categories and questions around their customer experience.",
  },
  {
    q: "Is Onloz only for restaurants?",
    a: "No. Onloz can be used by restaurants, hotels, salons, service businesses, retailers, automotive businesses, fitness businesses and other customer-facing businesses.",
  },
  {
    q: "Does Onloz post reviews automatically?",
    a: "No. The recommended workflow keeps the customer in control of the generated content and the publication decision.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border">
      <Container className="grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="15">FAQ</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Questions, answered honestly.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
            The short version: customers write from their real experience, they
            stay in control, and Onloz never guarantees a platform will publish
            a review.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="group border-t border-border first:border-t-0 last:border-b"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold tracking-tight select-none [&::-webkit-details-marker]:hidden">
                {q}
                <span className="faq-mark grid size-7 shrink-0 place-items-center border border-border font-mono text-sm transition-transform duration-200">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">
                {a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-muted/40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-12rem] left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-amber-200/50 blur-3xl dark:bg-amber-400/10" />
      </div>
      <Container className="relative py-28 text-center md:py-36">
        <p className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          <RiStarFill aria-hidden className="size-3.5 text-amber-400" />
          Ready when your customers are
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-6xl">
          Your customers already have something to say.
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-display text-2xl text-muted-foreground italic sm:text-3xl">
          Give them an easier way to say it.
        </p>
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <CtaLink href="#pricing">Start Free with Onloz</CtaLink>
          <CtaLink href="#how-it-works" variant="outline">
            See How It Works
          </CtaLink>
        </div>
        <p className="mx-auto mt-8 max-w-xl font-mono text-[10px] leading-relaxed tracking-[0.14em] text-muted-foreground uppercase">
          No complicated setup. No blank review box. Just a simpler way to turn
          customer experiences into feedback.
        </p>
      </Container>
    </section>
  )
}
