import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Roadmap — coming soon | Onloz",
  description:
    "What’s coming next on Onloz — a public look at the features and improvements we’re building.",
}

export default function RoadmapPage() {
  return (
    <ComingSoon
      title="Roadmap"
      section="Product"
      note="A public look at what’s coming next — the features, fixes and improvements we’re building, so you always know where Onloz is headed."
    />
  )
}
