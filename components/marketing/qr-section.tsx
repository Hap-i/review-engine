import { QRCodeSVG } from "qrcode.react"
import { RiCheckboxCircleFill } from "@remixicon/react"
import { Container, CtaLink, SectionLabel } from "@/components/marketing/primitives"
import { CONTACT_EMAIL, EARLY_ACCESS_SUBJECT } from "@/lib/site"

const PLACEMENTS = [
  "Tables",
  "Receipts",
  "Packaging",
  "Counter displays",
  "Thank-you cards",
  "Invoices",
  "Emails",
  "WhatsApp messages",
]

export function QrSection() {
  return (
    <section id="qr" className="scroll-mt-24 border-t border-border">
      <Container className="grid items-center gap-14 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel index="12">QR codes</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.01em] text-balance sm:text-5xl">
            Put your review experience everywhere.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Create a simple QR experience customers can access from any of the
            places they already look.
          </p>

          <ul className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-2">
            {PLACEMENTS.map((place) => (
              <li
                key={place}
                className="flex items-center gap-2.5 border-b border-border pb-3 text-sm"
              >
                <RiCheckboxCircleFill
                  aria-hidden
                  className="size-4 shrink-0 text-amber-400"
                />
                {place}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-xl border-l border-border pl-4 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground uppercase">
            Google itself recommends sharing review links or QR codes through
            places such as receipts, emails, chat interactions and physical
            locations.
          </p>

          <div className="mt-9">
            <CtaLink
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EARLY_ACCESS_SUBJECT)}`}
            >
              Create Your Review QR
            </CtaLink>
          </div>
        </div>

        {/* QR card */}
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="mx-auto flex max-w-xs flex-col items-center gap-5 border border-border bg-white p-8 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.4)]">
            <QRCodeSVG
              value="https://onloz.com/review"
              size={168}
              fgColor="#1a1a1a"
              bgColor="transparent"
              level="M"
            />
            <p className="text-center font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
              Scan to review
            </p>
          </div>
          <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Sample — your link goes live when you do
          </p>
        </div>
      </Container>
    </section>
  )
}
