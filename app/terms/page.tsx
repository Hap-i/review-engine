import type { Metadata } from "next"
import { ComingSoon } from "@/components/marketing/coming-soon"

export const metadata: Metadata = {
  title: "Terms of Service — coming soon | Onloz",
  description:
    "The agreement that governs how Onloz is used by businesses and customers.",
}

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms of Service"
      section="Legal"
      note="Our terms of service — the agreement that governs how Onloz is used."
    />
  )
}
