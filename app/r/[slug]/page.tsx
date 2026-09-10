import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSupabaseAnon } from "@/lib/supabase"
import { ReviewLanding } from "@/components/review-landing"
import { pageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

type ClientRow = {
  id: string
  business_name: string
  google_review_url: string
}

/**
 * Titled per business so the link a customer is handed reads as that business's
 * page rather than Onloz's. These landings live on the marketing host and are
 * meant to be findable (see robots.ts).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const client = await getClientBySlug(slug)

  if (!client) return {}

  return pageMetadata({
    title: `${client.business_name} — Share your experience`,
    description: `Been to ${client.business_name}? Tell them how it went — Onloz helps you put it into words in a few taps.`,
    path: `/r/${slug}`,
  })
}

/** How many tags from the owner's list to show a reviewer. */
const TAGS_TO_SHOW = 5

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const client = await getClientBySlug(slug)

  if (!client) {
    notFound()
  }

  return (
    <ReviewLanding
      clientId={client.id}
      businessName={client.business_name}
      googleReviewUrl={client.google_review_url}
      tags={await sampleTags(client.id)}
    />
  )
}

/**
 * Wrapped in cache() so generateMetadata and the page body share one query
 * instead of hitting Supabase twice for the same row within a request.
 */
const getClientBySlug = cache(
  async (slug: string): Promise<ClientRow | null> => {
    const supabase = getSupabaseAnon()
    const { data, error } = await supabase
      .from("clients")
      .select("id, business_name, google_review_url")
      .eq("slug", slug)
      .maybeSingle()

    if (error) {
      console.error("Failed to load client", error)
      return null
    }
    return data
  }
)

/** Fetch the client's tags and pick TAGS_TO_SHOW at random, once per page load. */
async function sampleTags(clientId: string): Promise<string[]> {
  const supabase = getSupabaseAnon()
  const { data, error } = await supabase
    .from("client_tags")
    .select("label")
    .eq("client_id", clientId)

  if (error) {
    console.error("Failed to load tags", error)
    return []
  }
  const labels = (data ?? []).map((row: { label: string }) => row.label)
  return shuffle(labels).slice(0, TAGS_TO_SHOW)
}

/** Fisher–Yates shuffle (returns a new array). */
function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
