// Server-only helpers shared by the admin and portal client actions.

import { getSupabaseAdmin } from "@/lib/supabase"
import type { ClientFormFields } from "@/lib/types"

export function readClientFields(formData: FormData): ClientFormFields {
  return {
    businessName: readString(formData, "businessName"),
    businessDescription: readString(formData, "businessDescription"),
    googleReviewUrl: readString(formData, "googleReviewUrl"),
  }
}

/** Shared validation for create/update. Returns an error message, or null if valid. */
export function validateClientFields(fields: ClientFormFields): string | null {
  if (!fields.businessName) {
    return "Business name is required."
  }
  if (!fields.businessDescription) {
    return "Business description is required."
  }
  if (!fields.googleReviewUrl || !isHttpUrl(fields.googleReviewUrl)) {
    return "Enter a valid Google review link (starting with https://)."
  }
  return null
}

export function readString(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim() : ""
}

/**
 * Replace a client's whole tag list (delete + insert keeps ordering simple).
 * Returns an error message, or null on success. Shared by the admin and portal
 * actions, which already authorize ownership before calling.
 */
export async function replaceClientTags(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  clientId: string,
  tags: string[]
): Promise<string | null> {
  const { error: deleteError } = await supabase
    .from("client_tags")
    .delete()
    .eq("client_id", clientId)
  if (deleteError) {
    console.error("replaceClientTags delete failed", deleteError)
    return "Could not save the tags. Please try again."
  }

  if (tags.length > 0) {
    const { error: insertError } = await supabase.from("client_tags").insert(
      tags.map((label, index) => ({
        client_id: clientId,
        label,
        position: index,
      }))
    )
    if (insertError) {
      console.error("replaceClientTags insert failed", insertError)
      return "Could not save the tags. Please try again."
    }
  }
  return null
}

const MAX_TAG_LENGTH = 40
const MAX_TAGS = 30

/** Trim/dedupe (case-insensitive) an unknown tag list, capping size. */
export function sanitizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<string>()
  const tags: string[] = []
  for (const item of raw) {
    if (typeof item !== "string") continue
    const label = item.trim().slice(0, MAX_TAG_LENGTH)
    if (!label) continue
    const key = label.toLowerCase()
    if (seen.has(key) || tags.length >= MAX_TAGS) continue
    seen.add(key)
    tags.push(label)
  }
  return tags
}

/**
 * Read the hidden `tags` field written by TagInput (JSON-encoded). Returns
 * undefined when the form has no tags field at all (leave existing tags alone),
 * or a sanitized array (possibly empty — the user cleared the tags) otherwise.
 */
export function readTagsField(
  formData: FormData,
  name = "tags"
): string[] | undefined {
  const raw = formData.get(name)
  if (typeof raw !== "string" || raw.length === 0) return undefined

  let parsed: unknown = null
  try {
    parsed = JSON.parse(raw)
  } catch {
    // Not JSON — fall back to comma/newline separated text.
    parsed = raw.split(/[\n,]+/)
  }
  return sanitizeTags(parsed)
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining accents
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumerics -> hyphen
    .replace(/^-+|-+$/g, "") // trim hyphens
    .slice(0, 48)
}

export async function uniqueSlug(businessName: string): Promise<string> {
  const base = slugify(businessName) || "client"
  const supabase = getSupabaseAdmin()

  async function exists(slug: string): Promise<boolean> {
    const { data } = await supabase
      .from("clients")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()
    return Boolean(data)
  }

  if (!(await exists(base))) return base

  // Collision — append a short random suffix and retry a few times.
  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix = Math.random().toString(36).slice(2, 6)
    const candidate = `${base}-${suffix}`
    if (!(await exists(candidate))) return candidate
  }

  // Extremely unlikely path; use a full uuid suffix.
  return `${base}-${crypto.randomUUID().slice(0, 8)}`
}
