import { ComingSoon } from "@/components/marketing/coming-soon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Blog — coming soon",
  description:
    "Essays, guides and news on reviews, reputation and customer feedback.",
  path: "/blog",
})

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog"
      section="Resources"
      note="Essays, guides and news on reviews, reputation and customer feedback."
    />
  )
}
