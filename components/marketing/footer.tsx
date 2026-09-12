import { RiMailLine } from "@remixicon/react"
import { Container, BrandMark } from "@/components/marketing/primitives"
import { CONTACT_EMAIL } from "@/lib/site"

type FooterLink = { label: string; href: string }

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Review Guide", href: "/review-guide" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Review & AI Usage Guidelines", href: "/review-ai-guidelines" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Acceptable Use Policy", href: "/acceptable-use" },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandMark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Turn customer feedback into reviews.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <RiMailLine aria-hidden className="size-4" />
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8"
          >
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  {col.heading}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            © 2026 Onloz. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
