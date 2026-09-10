/**
 * Marketing-site navigation targets.
 *
 * The core application lives on its own origin (app.onloz.com). While this
 * repo still hosts it under /portal during development, set
 * NEXT_PUBLIC_APP_URL to the app origin when the marketing site is deployed
 * separately and the login link will point there instead.
 */

import { baseUrl } from "@/lib/url"

const appOrigin = (
  process.env.NEXT_PUBLIC_APP_URL ?? ""
).replace(/\/+$/, "")

/** Origin of the core application ("" when served from this repo in dev). */
export function appUrl(): string {
  return appOrigin
}

/** Where the "Log in" nav item should point. */
export function signInHref(): string {
  return appOrigin ? `${appOrigin}/portal/login` : "/portal/login"
}

/**
 * Where the Onloz logo points from inside the app (portals, admin, sign-in).
 *
 * On the app origin, "/" is redirected straight back to the sign-in page by
 * proxy.ts — so a logo linking to "/" would be a no-op there. In production the
 * logo must therefore point absolutely at the public marketing site. Locally
 * both sites share an origin, so a relative "/" keeps client-side navigation.
 */
export function homeHref(): string {
  return process.env.NODE_ENV === "production" ? baseUrl() : "/"
}

/** Email used for the invite-only early-access flow. */
export const CONTACT_EMAIL = "info@onloz.com"

/** Subject line for the early-access request email. */
export const EARLY_ACCESS_SUBJECT = "Onloz early access request"

/* Legal entity details shown on the terms, privacy and policy pages. */

/** Jurisdiction whose laws govern the Terms of Service and any dispute. */
export const GOVERNING_LAW = "India"

/** Operating entity named in the legal pages. */
export const LEGAL_ENTITY_NAME = "Onloz"

/** Registered office. Blank until finalised — the row is hidden when empty. */
export const LEGAL_ENTITY_ADDRESS = ""

/** Jurisdiction of incorporation. Blank until finalised — hidden when empty. */
export const LEGAL_ENTITY_JURISDICTION = ""
