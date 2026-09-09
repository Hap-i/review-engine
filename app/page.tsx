import type { Metadata } from "next"
import { Fraunces } from "next/font/google"
import { cn } from "@/lib/utils"

import { MarketingNav } from "@/components/marketing/nav"
import { Hero } from "@/components/marketing/hero"
import { Problem, Solution } from "@/components/marketing/problem"
import { HowItWorks, BeforeAfter } from "@/components/marketing/how-it-works"
import { Features } from "@/components/marketing/features"
import {
  ForBusinessOwners,
  ForRestaurants,
  OtherBusinessTypes,
} from "@/components/marketing/industries"
import { AiTrust } from "@/components/marketing/ai-trust"
import { Dashboard } from "@/components/marketing/dashboard"
import { QrSection } from "@/components/marketing/qr-section"
import { Pricing } from "@/components/marketing/pricing"
import { Faq, FinalCta } from "@/components/marketing/faq"
import { MarketingFooter } from "@/components/marketing/footer"

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Onloz — Turn customer feedback into reviews",
  description:
    "Onloz helps customers turn their genuine experience into a polished review in seconds — without staring at a blank text box. Less typing. More reviews. Less friction.",
  keywords: [
    "customer reviews",
    "Google reviews",
    "review generation",
    "customer feedback",
    "QR code reviews",
  ],
  openGraph: {
    title: "Onloz — Turn customer feedback into reviews",
    description:
      "More customers have something to say. Make it easy for them to say it.",
    type: "website",
    siteName: "Onloz",
  },
}

export default function HomePage() {
  return (
    <div className={cn("font-sans", display.variable)}>
      <MarketingNav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <BeforeAfter />
        <Features />
        <ForBusinessOwners />
        <ForRestaurants />
        <OtherBusinessTypes />
        <AiTrust />
        <Dashboard />
        <QrSection />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <MarketingFooter />
    </div>
  )
}
