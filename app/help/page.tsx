import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Help Center — coming soon | Onloz",
  description:
    "Step-by-step guides and answers for setting up and running your Onloz review experience.",
}

export default function HelpPage() {
  return (
    <ComingSoon
      title="Help Center"
      section="Resources"
      note="Step-by-step guides and answers to help you set up and run your Onloz review experience."
    />
  )
}
