"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import {
  getPortalUserId,
  getServerSupabase,
  getSupabaseAdmin,
} from "@/lib/supabase"
import { getPortalOwner } from "@/lib/portal"
import {
  readClientFields,
  readTagsField,
  replaceClientTags,
  sanitizeTags,
  uniqueSlug,
  validateClientFields,
} from "@/lib/client-helpers"
import type {
  ClientFormState,
  ClientReview,
  ClientReviewStats,
  DeleteResult,
  ReviewPage,
} from "@/lib/types"

export type LoginState = {
  error?: string
  /** Submitted email, echoed back on failure so the login form can keep it. */
  email?: string
}

/** Business owner log in via Supabase Auth; the session is stored in cookies. */
export async function loginUser(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Enter your email and password.", email }
  }

  const supabase = await getServerSupabase()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error("loginUser failed", error.message)
    return { error: "Incorrect email or password.", email }
  }

  // Only owners (rows in profiles) may enter the portal.
  const ownerId = await getPortalUserId()
  if (!ownerId || !(await getPortalOwner())) {
    await supabase.auth.signOut()
    return {
      error: "This account is not set up as a business owner yet.",
      email,
    }
  }

  redirect("/portal")
}

export async function logoutUser(): Promise<void> {
  const supabase = await getServerSupabase()
  await supabase.auth.signOut()
  redirect("/portal/login")
}

/**
 * Onboard a client under the current owner. Enforces the owner's quota before
 * inserting so an owner can never exceed the number the admin set for them.
 */
export async function onboardClient(
  prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const owner = await getPortalOwner()
  if (!owner) {
    return { error: "Please sign in again." }
  }

  const fields = readClientFields(formData)
  const validationError = validateClientFields(fields)
  if (validationError) {
    return { error: validationError, fields }
  }

  const supabase = getSupabaseAdmin()
  const { count, error: countError } = await supabase
    .from("clients")
    .select("id", { count: "exact", head: true })
    .eq("owner_id", owner.id)
  if (countError) {
    console.error("onboardClient count failed", countError)
    return { error: "Could not onboard the client. Please try again.", fields }
  }

  const used = count ?? 0
  if (used >= owner.max_clients) {
    return {
      error: `Your quota of ${owner.max_clients} client${owner.max_clients === 1 ? "" : "s"} is used up. Ask the admin to raise it.`,
      fields,
    }
  }

  const slug = await uniqueSlug(fields.businessName ?? "")
  const { data: created, error } = await supabase
    .from("clients")
    .insert({
      slug,
      business_name: fields.businessName,
      business_description: fields.businessDescription,
      google_review_url: fields.googleReviewUrl,
      owner_id: owner.id,
    })
    .select("id")
    .single()
  if (error) {
    console.error("onboardClient insert failed", error)
    return { error: "Could not onboard the client. Please try again.", fields }
  }

  const tags = readTagsField(formData) ?? []
  const tagError = await replaceClientTags(supabase, created.id, tags)
  if (tagError) return { error: tagError, fields }

  revalidatePath("/portal")
  revalidatePath("/portal/clients")
  return { success: true }
}

/** Owner edits one of their own clients (name/description/link only). */
export async function updateOwnClient(
  prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const owner = await getPortalOwner()
  if (!owner) return { error: "Please sign in again." }

  const id = String(formData.get("id") ?? "").trim()
  const fields = readClientFields(formData)
  if (!id) return { error: "Client id is missing.", fields }
  const validationError = validateClientFields(fields)
  if (validationError) return { error: validationError, fields }

  const supabase = getSupabaseAdmin()
  if (!(await isOwnedBy(supabase, id, owner.id))) {
    return { error: "This client is not yours to edit." }
  }

  const { error } = await supabase
    .from("clients")
    .update({
      business_name: fields.businessName,
      business_description: fields.businessDescription,
      google_review_url: fields.googleReviewUrl,
    })
    .eq("id", id)
    .eq("owner_id", owner.id)
  if (error) {
    console.error("updateOwnClient failed", error)
    return { error: "Could not save the changes. Please try again.", fields }
  }

  // Only touch tags when the edit form sent a tags field (pre-filled from the
  // current list), so unrelated callers can't wipe them by omission.
  const tags = readTagsField(formData)
  if (tags !== undefined) {
    const tagError = await replaceClientTags(supabase, id, tags)
    if (tagError) return { error: tagError, fields }
  }

  revalidatePath("/portal/clients")
  return { success: true }
}

/** Owner deletes one of their own clients. */
export async function deleteOwnClient(clientId: string): Promise<DeleteResult> {
  const owner = await getPortalOwner()
  if (!owner) return { error: "Please sign in again." }

  const supabase = getSupabaseAdmin()
  if (!(await isOwnedBy(supabase, clientId, owner.id))) {
    return { error: "This client is not yours to delete." }
  }

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", clientId)
    .eq("owner_id", owner.id)
  if (error) {
    console.error("deleteOwnClient failed", error)
    return { error: "Could not delete the client. Please try again." }
  }

  revalidatePath("/portal")
  revalidatePath("/portal/clients")
  return { success: true }
}

const REVIEWS_PAGE_SIZE = 20

/** Review history for one of the owner's clients (see getClientReviews). */
export async function getOwnClientReviews(
  clientId: string,
  offset = 0
): Promise<ReviewPage> {
  const empty: ReviewPage = { reviews: [], ratings: [], hasMore: false }
  const owner = await getPortalOwner()
  if (!owner) return empty

  const supabase = getSupabaseAdmin()
  if (!(await isOwnedBy(supabase, clientId, owner.id))) return empty

  const [pageRes, statsRes] = await Promise.all([
    supabase
      .from("reviews")
      .select("id, client_id, rating, review_text, created_at, tags")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })
      .range(offset, offset + REVIEWS_PAGE_SIZE - 1),
    supabase
      .from("reviews")
      .select("rating, tags")
      .eq("client_id", clientId),
  ])
  if (pageRes.error || statsRes.error) return empty

  const reviews = (pageRes.data ?? []) as ClientReview[]
  return {
    reviews,
    ratings: (statsRes.data ?? []) as ClientReviewStats[],
    hasMore: reviews.length === REVIEWS_PAGE_SIZE,
  }
}

/**
 * Replace the whole tag list for one of the owner's clients. Deleting and
 * re-inserting keeps ordering simple; it's a tiny set of rows per business.
 */
export async function setOwnClientTags(
  clientId: string,
  rawTags: string[]
): Promise<DeleteResult> {
  const owner = await getPortalOwner()
  if (!owner) return { error: "Please sign in again." }

  const tags = sanitizeTags(rawTags)

  const supabase = getSupabaseAdmin()
  if (!(await isOwnedBy(supabase, clientId, owner.id))) {
    return { error: "This client is not yours to edit." }
  }

  const tagError = await replaceClientTags(supabase, clientId, tags)
  if (tagError) return { error: tagError }

  revalidatePath("/portal/clients")
  return { success: true }
}

async function isOwnedBy(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  clientId: string,
  ownerId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("clients")
    .select("owner_id")
    .eq("id", clientId)
    .maybeSingle()
  return data?.owner_id === ownerId
}
