/**
 * Marketing-site navigation targets.
 *
 * The core application lives on its own origin (app.onloz.com). While this
 * repo still hosts it under /portal during development, set
 * NEXT_PUBLIC_APP_URL to the app origin when the marketing site is deployed
 * separately and the login link will point there instead.
 */

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

/** Email used for the invite-only early-access flow. */
export const CONTACT_EMAIL = "info@onloz.com"

/** Subject line for the early-access request email. */
export const EARLY_ACCESS_SUBJECT = "Onloz early access request"
