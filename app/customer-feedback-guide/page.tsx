import { ComingSoon } from "@/components/marketing/coming-soon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Customer Feedback Guide — coming soon",
  description:
    "How to listen to what customers say and turn it into something useful for your business.",
  path: "/customer-feedback-guide",
})

export default function CustomerFeedbackGuidePage() {
  return (
    <ComingSoon
      title="Customer Feedback Guide"
      section="Resources"
      note="How to listen to what customers say and turn it into something useful for your business."
    />
  )
}
