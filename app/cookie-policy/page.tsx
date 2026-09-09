import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Cookie Policy — coming soon | Onloz",
  description: "What cookies Onloz uses and how you can control them.",
}

export default function CookiePolicyPage() {
  return (
    <ComingSoon
      title="Cookie Policy"
      section="Legal"
      note="What cookies Onloz uses and how you can control them."
    />
  )
}
