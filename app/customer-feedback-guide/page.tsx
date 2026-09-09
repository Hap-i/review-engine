import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Customer Feedback Guide — coming soon | Onloz",
  description:
    "How to listen to what customers say and turn it into something useful for your business.",
}

export default function CustomerFeedbackGuidePage() {
  return (
    <ComingSoon
      title="Customer Feedback Guide"
      section="Resources"
      note="How to listen to what customers say and turn it into something useful for your business."
    />
  )
}
