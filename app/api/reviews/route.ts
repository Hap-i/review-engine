import { getSupabaseAnon } from "@/lib/supabase"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { clientId, rating, reviewText, tags } = parseBody(body)

  if (!clientId) {
    return Response.json({ error: "clientId is required" }, { status: 400 })
  }
  if (rating !== 1 && rating !== 2 && rating !== 3 && rating !== 4 && rating !== 5) {
    return Response.json({ error: "rating must be between 1 and 5" }, { status: 400 })
  }
  if (!reviewText || reviewText.trim().length === 0) {
    return Response.json({ error: "reviewText is required" }, { status: 400 })
  }

  const supabase = getSupabaseAnon()
  const { error } = await supabase.from("reviews").insert({
    client_id: clientId,
    rating,
    review_text: reviewText.trim(),
    tags: tags.length > 0 ? tags : null,
  })

  if (error) {
    console.error("Failed to save review", error)
    return Response.json({ error: "Could not save review" }, { status: 500 })
  }

  return Response.json({ ok: true })
}

function parseBody(body: unknown): {
  clientId?: string
  rating?: number
  reviewText?: string
  tags: string[]
} {
  if (typeof body !== "object" || body === null) return { tags: [] }
  const record = body as Record<string, unknown>

  // Keep only sane tags: trimmed, deduped, <40 chars, capped at 5.
  const tags = Array.isArray(record.tags)
    ? Array.from(
        new Set(
          record.tags
            .filter((t): t is string => typeof t === "string")
            .map((t) => t.trim().slice(0, 40))
            .filter(Boolean)
        )
      ).slice(0, 5)
    : []

  return {
    clientId: typeof record.clientId === "string" ? record.clientId : undefined,
    rating: typeof record.rating === "number" ? record.rating : undefined,
    reviewText: typeof record.reviewText === "string" ? record.reviewText : undefined,
    tags,
  }
}
