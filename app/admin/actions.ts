"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { getSupabaseAdmin } from "@/lib/supabase"
import {
  readClientFields,
  readString,
  readTagsField,
  replaceClientTags,
  uniqueSlug,
  validateClientFields,
} from "@/lib/client-helpers"
import type { ClientFormState, ClientReview, DeleteResult } from "@/lib/types"

export type CreateClientState = ClientFormState
export type UpdateClientState = ClientFormState
export type DeleteClientState = DeleteResult

export type CreateUserState = {
  success?: boolean
  error?: string
  fields?: {
    name?: string
    email?: string
    password?: string
    maxClients?: string
  }
}

export type DeleteUserState = {
  success?: boolean
  error?: string
}

/** Read an optional owner id from a form; empty string maps to null (unassigned). */
function readOwnerId(formData: FormData): string | null {
  const value = readString(formData, "ownerId")
  return value.length > 0 ? value : null
}

/**
 * Create a client (admin). Optionally assigns an owner. Re-verifies basic auth
 * from the request headers — proxy.ts gates the page, but a server action can be
 * invoked directly, so always authorize inside the action too.
 */
export async function createClient(
  prevState: CreateClientState,
  formData: FormData
): Promise<CreateClientState> {
  if (!(await isAuthorized())) {
    return { error: "Unauthorized. Refresh /admin to sign in again." }
  }

  const fields = readClientFields(formData)
  const validationError = validateClientFields(fields)
  if (validationError) {
    return { error: validationError, fields }
  }

  const slug = await uniqueSlug(fields.businessName ?? "")
  const ownerId = readOwnerId(formData)

  const supabase = getSupabaseAdmin()
  const { data: created, error } = await supabase
    .from("clients")
    .insert({
      slug,
      business_name: fields.businessName,
      business_description: fields.businessDescription,
      google_review_url: fields.googleReviewUrl,
      owner_id: ownerId,
    })
    .select("id")
    .single()

  if (error) {
    console.error("createClient insert failed", error)
    return { error: "Could not create the client. Please try again.", fields }
  }

  const tags = readTagsField(formData) ?? []
  const tagError = await replaceClientTags(supabase, created.id, tags)
  if (tagError) return { error: tagError, fields }

  revalidatePath("/admin")
  return { success: true }
}

/**
 * Update a client's editable fields and (admin) owner. The slug is intentionally
 * left untouched so existing public links and QR codes keep working.
 */
export async function updateClient(
  prevState: UpdateClientState,
  formData: FormData
): Promise<UpdateClientState> {
  if (!(await isAuthorized())) {
    return { error: "Unauthorized. Refresh /admin to sign in again." }
  }

  const id = readString(formData, "id")
  const fields = readClientFields(formData)
  const ownerId = readOwnerId(formData)

  if (!id) {
    return { error: "Client id is missing.", fields }
  }
  const validationError = validateClientFields(fields)
  if (validationError) {
    return { error: validationError, fields }
  }

  const supabase = getSupabaseAdmin()
  const { error } = await supabase
    .from("clients")
    .update({
      business_name: fields.businessName,
      business_description: fields.businessDescription,
      google_review_url: fields.googleReviewUrl,
      owner_id: ownerId,
    })
    .eq("id", id)

  if (error) {
    console.error("updateClient update failed", error)
    return { error: "Could not save the changes. Please try again.", fields }
  }

  // Only touch tags when the edit form sent a tags field (pre-filled from the
  // current list), so other update paths can't wipe them by omission.
  const tags = readTagsField(formData)
  if (tags !== undefined) {
    const tagError = await replaceClientTags(supabase, id, tags)
    if (tagError) return { error: tagError, fields }
  }

  revalidatePath("/admin")
  return { success: true }
}

/** Delete a client. Reviews are removed by the database's on-delete cascade. */
export async function deleteClient(
  clientId: string
): Promise<DeleteClientState> {
  if (!(await isAuthorized())) {
    return { error: "Unauthorized. Refresh /admin to sign in again." }
  }

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("clients").delete().eq("id", clientId)

  if (error) {
    console.error("deleteClient delete failed", error)
    return { error: "Could not delete the client. Please try again." }
  }

  revalidatePath("/admin")
  return { success: true }
}

/** Return a client's most recent reviews for the expanded row. */
export async function getClientReviews(
  clientId: string
): Promise<ClientReview[]> {
  if (!(await isAuthorized())) {
    return []
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("reviews")
    .select("id, client_id, rating, review_text, created_at, tags")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("getClientReviews select failed", error)
    return []
  }

  return (data ?? []) as ClientReview[]
}

/**
 * Create a business-owner user + their profile. The password is typed by the
 * admin and shared once; Supabase stores only its hash in auth.users.
 */
export async function createUser(
  prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  if (!(await isAuthorized())) {
    return { error: "Unauthorized. Refresh /admin to sign in again." }
  }

  const fields = {
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    password: readString(formData, "password"),
    maxClients: readString(formData, "maxClients"),
  }

  const validationError = validateUserFields(fields)
  if (validationError) {
    return { error: validationError, fields }
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.auth.admin.createUser({
    email: fields.email,
    password: fields.password,
    email_confirm: true,
    user_metadata: { name: fields.name },
  })
  if (error || !data.user) {
    console.error("createUser failed", error)
    const message = error?.message?.toLowerCase().includes("already")
      ? "That email is already registered."
      : "Could not create the user. Please try again."
    return { error: message, fields }
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    email: fields.email,
    name: fields.name,
    max_clients: Number(fields.maxClients),
  })
  if (profileError) {
    console.error("createUser profile insert failed", profileError)
    return {
      error: "Could not save the user profile. Please try again.",
      fields,
    }
  }

  revalidatePath("/admin")
  return { success: true }
}

/** Delete a user. Their profile cascades; their clients become unassigned. */
export async function deleteUser(userId: string): Promise<DeleteUserState> {
  if (!(await isAuthorized())) {
    return { error: "Unauthorized. Refresh /admin to sign in again." }
  }

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) {
    console.error("deleteUser failed", error)
    return { error: "Could not delete the user. Please try again." }
  }

  revalidatePath("/admin")
  return { success: true }
}

function validateUserFields(fields: {
  name: string
  email: string
  password: string
  maxClients: string
}): string | null {
  if (!fields.name) return "Name is required."
  if (!fields.email || !/^\S+@\S+\.\S+$/.test(fields.email)) {
    return "Enter a valid email address."
  }
  if (fields.password.length < 6) {
    return "Password must be at least 6 characters."
  }
  const maxClients = Number(fields.maxClients)
  if (!Number.isInteger(maxClients) || maxClients < 0) {
    return "Client quota must be 0 or more."
  }
  return null
}

async function isAuthorized(): Promise<boolean> {
  const adminToken = process.env.ADMIN_TOKEN
  if (!adminToken) return false

  const header = (await headers()).get("authorization")
  return header === "Basic " + btoa(`admin:${adminToken}`)
}
