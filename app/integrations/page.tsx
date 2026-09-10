import { ComingSoon } from "@/components/marketing/coming-soon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Integrations — coming soon",
  description:
    "The review destinations and tools Onloz connects to — Google Reviews first, with more integrations to follow.",
  path: "/integrations",
})

export default function IntegrationsPage() {
  return (
    <ComingSoon
      title="Integrations"
      section="Product"
      note="The review destinations and tools Onloz connects to — Google Reviews first, with more to follow."
    />
  )
}
