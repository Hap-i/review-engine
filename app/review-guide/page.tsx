import { ComingSoon } from "@/components/marketing/coming-soon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Review Guide — coming soon",
  description:
    "How to ask for reviews the right way and turn more happy customers into written feedback.",
  path: "/review-guide",
})

export default function ReviewGuidePage() {
  return (
    <ComingSoon
      title="Review Guide"
      section="Resources"
      note="How to ask for reviews the right way — and turn more happy customers into written feedback."
    />
  )
}
