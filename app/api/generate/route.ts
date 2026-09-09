import { generateReview, fallbackReview, type StarRating } from "@/lib/deepseek"
import { getSupabaseAnon } from "@/lib/supabase"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { clientId, rating, tags, note } = parseBody(body)
  if (!clientId || !isRating(rating)) {
    return Response.json({ error: "clientId and a rating (1-5) are required" }, { status: 400 })
  }

  const supabase = getSupabaseAnon()
  const { data: client, error } = await supabase
    .from("clients")
    .select("business_name, business_description")
    .eq("id", clientId)
    .maybeSingle()

  if (error || !client) {
    console.error("Failed to load client for generation", error)
    return Response.json({ error: "Client not found" }, { status: 404 })
  }

  const input = {
    businessName: client.business_name,
    businessDescription: client.business_description,
    rating,
    tags: tags.length > 0 ? tags : undefined,
    note: note.length > 0 ? note : undefined,
  }

  try {
    const review = await generateReview(input)
    return Response.json({ review })
  } catch (err) {
    // Never block the reviewer: fall back to a deterministic review.
    console.error("Review generation failed, using fallback", err)
    return Response.json({ review: fallbackReview(input), fallback: true })
  }
}

function parseBody(body: unknown): {
  clientId?: string
  rating?: number
  tags: string[]
  note: string
} {
  if (typeof body !== "object" || body === null) {
    return { tags: [], note: "" }
  }
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

  const rawNote = typeof record.note === "string" ? record.note : ""
  const note = rawNote.trim().slice(0, 300)

  return {
    clientId: typeof record.clientId === "string" ? record.clientId : undefined,
    rating: typeof record.rating === "number" ? record.rating : undefined,
    tags,
    note,
  }
}

function isRating(value: unknown): value is StarRating {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5
}
