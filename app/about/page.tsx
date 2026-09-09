import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "About — coming soon | Onloz",
  description:
    "Why we’re building Onloz — and the problem we think deserves a simpler answer.",
}

export default function AboutPage() {
  return (
    <ComingSoon
      title="About"
      section="Company"
      note="Why we’re building Onloz — the problem we think deserves a simpler answer, and the people behind it."
    />
  )
}
