import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Acceptable Use Policy — coming soon | Onloz",
  description: "What’s allowed on Onloz — and what isn’t.",
}

export default function AcceptableUsePage() {
  return (
    <ComingSoon
      title="Acceptable Use Policy"
      section="Legal"
      note="What’s allowed on Onloz — and what isn’t."
    />
  )
}
