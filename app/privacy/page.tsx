import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Privacy Policy — coming soon | Onloz",
  description:
    "How Onloz collects, uses and protects data — for customers and for businesses.",
}

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      section="Legal"
      note="How Onloz collects, uses and protects data — for customers and for businesses."
    />
  )
}
