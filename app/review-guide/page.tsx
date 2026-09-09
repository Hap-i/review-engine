import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Review Guide — coming soon | Onloz",
  description:
    "How to ask for reviews the right way and turn more happy customers into written feedback.",
}

export default function ReviewGuidePage() {
  return (
    <ComingSoon
      title="Review Guide"
      section="Resources"
      note="How to ask for reviews the right way — and turn more happy customers into written feedback."
    />
  )
}
