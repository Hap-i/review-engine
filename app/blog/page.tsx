import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Blog — coming soon | Onloz",
  description:
    "Essays, guides and news on reviews, reputation and customer feedback.",
}

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog"
      section="Resources"
      note="Essays, guides and news on reviews, reputation and customer feedback."
    />
  )
}
