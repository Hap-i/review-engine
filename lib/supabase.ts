import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { cache } from "react"

/**
 * Server-only Supabase clients. Never import this module from a "use client"
 * component — both clients may read secret env vars.
 */

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

/** Anon client — used for public reads/writes (client page + review landing APIs). */
export function getSupabaseAnon() {
  return createClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  )
}

/** Service-role client — used for admin reads/writes (bypasses RLS). */
export function getSupabaseAdmin() {
  return createClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

/**
 * Anon client bound to the request cookies, for reading/refreshing the logged-in
 * user's Supabase Auth session (business-owner portal). Server-only.
 */
export async function getServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component where cookie writes are ignored.
            // The session is still refreshed on the next interactive request.
          }
        },
      },
    }
  )
}

/**
 * The logged-in owner's auth user id, or null when unauthenticated.
 *
 * `getUser()` validates the JWT against the Supabase Auth server over the
 * network, so it is memoized per request — the layout and the page under it
 * would otherwise each pay a separate round trip on every navigation.
 */
export const getPortalUserId = cache(async (): Promise<string | null> => {
  const supabase = await getServerSupabase()
  const { data } = await supabase.auth.getUser()
  return data.user?.id ?? null
})
