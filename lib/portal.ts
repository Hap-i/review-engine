// Server-only helpers for the business-owner portal.

import { cache } from "react"
import { redirect } from "next/navigation"
import { getPortalUserId, getSupabaseAdmin } from "@/lib/supabase"
import type { Client } from "@/lib/types"
import {
  computeTagInsight,
  type TagInsight,
  type TaggedReview,
} from "@/lib/tag-insight"

export type PortalOwner = {
  id: string
  email: string
  name: string
  max_clients: number
  created_at: string
}

export type OwnerRecentReview = {
  id: string
  client_id: string
  rating: number
  review_text: string
  created_at: string
  tags?: string[] | null
  clients: { business_name: string } | null
}

/**
 * The current owner's profile, or null when logged out / not a known profile.
 * Memoized per request so the portal layout and the page beneath it share one
 * lookup instead of each issuing it.
 */
export const getPortalOwner = cache(async (): Promise<PortalOwner | null> => {
  const userId = await getPortalUserId()
  if (!userId) return null

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, max_clients, created_at")
    .eq("id", userId)
    .maybeSingle()
  if (error || !data) return null
  return data as PortalOwner
})

/** Like getPortalOwner but redirects to the login page when unauthenticated. */
export async function requireOwner(): Promise<PortalOwner> {
  const owner = await getPortalOwner()
  if (!owner) redirect("/portal/login")
  return owner
}

const OWNED_CLIENT_SELECT =
  "id, slug, business_name, business_description, google_review_url, created_at, owner_id"

/**
 * Memoized per request: the dashboard calls getOwnerTotals,
 * getOwnerTagSummary and listOwnerRecentReviews concurrently, and without this
 * they would each re-run the identical clients query.
 */
const ownedClientIds = cache(async (ownerId: string): Promise<string[]> => {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("clients")
    .select("id")
    .eq("owner_id", ownerId)
  return (data ?? []).map((row) => row.id)
})

/** All clients owned by this owner, plus per-client review tallies and tags. */
export async function getOwnedClients(ownerId: string): Promise<{
  clients: Client[]
  reviewCounts: Record<string, number>
  tagsByClient: Record<string, string[]>
}> {
  const supabase = getSupabaseAdmin()
  const { data: clients } = await supabase
    .from("clients")
    .select(OWNED_CLIENT_SELECT)
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })

  const rows = (clients ?? []) as Client[]
  const ids = rows.map((c) => c.id)
  const reviewCounts: Record<string, number> = {}
  const tagsByClient: Record<string, string[]> = {}
  if (ids.length > 0) {
    const [{ data: counts }, { data: tags }] = await Promise.all([
      supabase.from("reviews").select("client_id").in("client_id", ids),
      supabase
        .from("client_tags")
        .select("client_id, label")
        .in("client_id", ids)
        .order("position", { ascending: true }),
    ])
    for (const row of counts ?? []) {
      reviewCounts[row.client_id] = (reviewCounts[row.client_id] ?? 0) + 1
    }
    for (const row of tags ?? []) {
      const list = tagsByClient[row.client_id] ?? []
      list.push(row.label)
      tagsByClient[row.client_id] = list
    }
  }
  return { clients: rows, reviewCounts, tagsByClient }
}

/** Dashboard totals across everything the owner manages. */
export async function getOwnerTotals(ownerId: string): Promise<{
  clients: number
  reviews: number
}> {
  const ids = await ownedClientIds(ownerId)
  const supabase = getSupabaseAdmin()
  if (ids.length === 0) return { clients: 0, reviews: 0 }

  const { count: reviews } = await supabase
    .from("reviews")
    .select("id", { count: "exact", head: true })
    .in("client_id", ids)
  return { clients: ids.length, reviews: reviews ?? 0 }
}

/** Recent reviews across the owner's clients (for the dashboard). */
export async function listOwnerRecentReviews(
  ownerId: string,
  limit = 5
): Promise<OwnerRecentReview[]> {
  const ids = await ownedClientIds(ownerId)
  if (ids.length === 0) return []

  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("reviews")
    .select(
      "id, client_id, rating, review_text, created_at, tags, clients(business_name)"
    )
    .in("client_id", ids)
    .order("created_at", { ascending: false })
    .limit(limit)
  return (data ?? []) as unknown as OwnerRecentReview[]
}

/**
 * Praise/critique totals per tag across everything the owner manages. Tags are
 * matched by label, so a tag shared by two of the owner's businesses is merged.
 */
export async function getOwnerTagSummary(
  ownerId: string
): Promise<TagInsight[]> {
  const ids = await ownedClientIds(ownerId)
  if (ids.length === 0) return []

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("reviews")
    .select("rating, tags")
    .in("client_id", ids)
    .not("tags", "is", null)
  if (error) {
    console.error("getOwnerTagSummary select failed", error)
    return []
  }
  return computeTagInsight((data ?? []) as TaggedReview[])
}
