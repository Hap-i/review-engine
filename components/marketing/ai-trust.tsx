import { RiEditLine, RiEyeLine, RiShieldCheckLine } from "@remixicon/react"
import { Container, SectionLabel } from "@/components/marketing/primitives"

const PRINCIPLES = [
  {
    icon: RiEyeLine,
    title: "Real experience",
    body: "The review should reflect the customer’s genuine experience.",
  },
  {
    icon: RiEditLine,
    title: "Customer control",
    body: "Customers can review and edit the generated text before posting.",
  },
  {
    icon: RiShieldCheckLine,
    title: "No invented details",
    body: "Onloz is designed to avoid adding unsupported facts or experiences.",
  },
]

export function AiTrust() {
  return (
    <section
      id="ai-trust"
      className="scroll-mt-24 border-t border-border"
    >
      <Container className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="10" className="justify-center">
            How the writing works
          </SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            AI writes the words.{" "}
            <span className="italic">Your customer provides the experience.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Onloz is designed to help customers express what they actually
            experienced — not invent an experience for them. Customers provide
            the rating and feedback; Onloz helps turn that input into natural
            language. They can review and edit the result before deciding
            whether to publish it.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="flex flex-col gap-5 border border-border bg-card p-8"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center border border-border bg-background">
                  <Icon aria-hidden className="size-5 text-amber-400" />
                </span>
                <span aria-hidden className="font-mono text-5xl font-light text-foreground/[0.06]">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl border-t border-border pt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Onloz does not guarantee that a third-party platform will publish,
          retain or display any review. Review platforms independently
          determine which content they accept and display. This matters because
          Google requires that reviews reflect genuine experiences and can
          remove reviews that violate its policies.
        </p>
      </Container>
    </section>
  )
}
