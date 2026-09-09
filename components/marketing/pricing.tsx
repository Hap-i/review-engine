import { RiMailLine, RiStarFill } from "@remixicon/react"
import { Container, SectionLabel } from "@/components/marketing/primitives"
import { CONTACT_EMAIL, EARLY_ACCESS_SUBJECT } from "@/lib/site"

export function Pricing() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EARLY_ACCESS_SUBJECT)}`

  return (
    <section id="pricing" className="scroll-mt-24 border-t border-border bg-muted/40">
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index="14" className="justify-center">
            Pricing
          </SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Simple pricing. Built to grow with you.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We&rsquo;re keeping pricing honest and rolling Onloz out in stages.
            Right now, access is by invitation — no plans to pick through, no
            fine print to wade into.
          </p>
        </div>

        {/* Invitation card */}
        <div className="relative mx-auto mt-14 max-w-3xl overflow-hidden border border-foreground bg-foreground text-background">
          <RiStarFill
            aria-hidden
            className="absolute -top-6 -right-6 size-28 rotate-12 text-amber-400/25"
          />
          <div className="p-10 md:p-14">
            <p className="font-mono text-[11px] tracking-[0.24em] text-amber-500 uppercase dark:text-amber-600">
              Invite only — early access
            </p>
            <h3 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-[-0.01em] text-balance sm:text-4xl">
              Onloz is invite-only for now.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75">
              We&rsquo;re onboarding a small number of businesses first — the
              cafés, salons, hotels and shops whose customers are talking to
              them every day — so we can build alongside them before we open
              the doors wider.
            </p>

            <a
              href={mailto}
              className="group mt-9 inline-flex max-w-full items-center gap-3 border border-background/30 bg-background px-6 py-4 font-mono text-sm tracking-[0.08em] text-foreground uppercase transition-colors hover:border-background"
            >
              <RiMailLine
                aria-hidden
                className="size-5 shrink-0 text-amber-500"
              />
              <span className="truncate">{CONTACT_EMAIL}</span>
            </a>

            <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-background/55 uppercase">
              Send an email — a person replies within two business days.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-4 border border-border bg-card p-6">
          <span aria-hidden className="mt-0.5 size-1.5 shrink-0 rounded-full bg-amber-400" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="text-foreground">What early businesses get:</span>{" "}
            a review experience for your location, AI review drafting, your own
            QR code, custom branding and straightforward analytics — and a
            direct line to the team building Onloz. No credit card required.
          </p>
        </div>
      </Container>
    </section>
  )
}
