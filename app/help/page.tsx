import { ComingSoon } from "@/components/marketing/coming-soon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Help Center — coming soon",
  description:
    "Step-by-step guides and answers for setting up and running your Onloz review experience.",
  path: "/help",
})

export default function HelpPage() {
  return (
    <ComingSoon
      title="Help Center"
      section="Resources"
      note="Step-by-step guides and answers to help you set up and run your Onloz review experience."
    />
  )
}
