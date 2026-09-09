import { Container, SectionLabel } from "@/components/marketing/primitives"

const FEATURES = [
  {
    emoji: "⚡",
    title: "Fast for customers",
    body: "Designed for people who have 30 seconds, not 5 minutes.",
  },
  {
    emoji: "🤖",
    title: "AI-powered writing",
    body: "Turn simple feedback into clear, natural language.",
  },
  {
    emoji: "📱",
    title: "Mobile-first",
    body: "Customers can complete the entire experience from their phone.",
  },
  {
    emoji: "🔗",
    title: "One-click review journey",
    body: "Connect your business’s review destination and make the next step obvious.",
    note: "Google itself supports businesses sharing review links and QR codes to make leaving reviews easier.",
  },
  {
    emoji: "🎨",
    title: "Your brand, your experience",
    body: "Customize the customer-facing experience with your business name, logo and branding.",
  },
  {
    emoji: "📊",
    title: "Track what matters",
    body: "See how many customers started, completed and generated review drafts.",
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-border">
      <Container className="py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="05">Features</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
              Everything you need to make reviews easier.
            </h2>
          </div>
          <p className="flex items-end text-base leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
            Onloz shrinks the distance between a happy customer and a written
            review — for the customer and for your team.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ emoji, title, body, note }) => (
            <article
              key={title}
              className="group flex flex-col gap-4 bg-card p-8 md:p-9"
            >
              <span
                aria-hidden
                className="inline-flex size-12 items-center justify-center border border-border bg-background text-xl transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                {emoji}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
              {note && (
                <p className="mt-auto border-t border-border pt-3 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted-foreground/80 uppercase">
                  {note}
                </p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
