import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Integrations — coming soon | Onloz",
  description:
    "The review destinations and tools Onloz connects to — Google Reviews first, with more integrations to follow.",
}

export default function IntegrationsPage() {
  return (
    <ComingSoon
      title="Integrations"
      section="Product"
      note="The review destinations and tools Onloz connects to — Google Reviews first, with more to follow."
    />
  )
}
