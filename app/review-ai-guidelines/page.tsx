import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Review & AI Usage Guidelines — coming soon | Onloz",
  description:
    "How reviews are written on Onloz, who stays in control, and our rules around genuine experiences.",
}

export default function ReviewAiGuidelinesPage() {
  return (
    <ComingSoon
      title="Review & AI Usage Guidelines"
      section="Legal"
      note="How reviews are written on Onloz, who stays in control, and our rules around genuine, real experiences."
    />
  )
}
