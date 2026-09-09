import { notFound } from "next/navigation"
import { getSupabaseAnon } from "@/lib/supabase"
import { ReviewLanding } from "@/components/review-landing"

export const dynamic = "force-dynamic"

type ClientRow = {
  id: string
  business_name: string
  google_review_url: string
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

async function getClientBySlug(slug: string): Promise<ClientRow | null> {
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
