import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * One Next.js deployment serves two origins, routed by the request Host:
 *
 *   onloz.com        marketing site: "/", SEO pages, and the public review
 *                    links at /r/[slug] (what goes on receipts & QR codes).
 *   app.onloz.com    core application: /portal* (login + dashboard) and
 *                    /admin* (still gated behind HTTP Basic Auth).
 *
 * A URL arriving on the "wrong" host is redirected (308) to the origin that
 * owns it. Unknown hosts — localhost, 127.0.0.1, Vercel preview deploys —
 * keep every route so local development and ephemeral deploys are unchanged.
 *
 * Override the hostnames with ONLOZ_APP_HOST / ONLOZ_MARKETING_HOST.
 */

const APP_HOST = process.env.ONLOZ_APP_HOST ?? "app.onloz.com"
const MARKETING_HOST = process.env.ONLOZ_MARKETING_HOST ?? "onloz.com"

/**
 * Marketing is the apex domain plus www only — NOT its subdomains, otherwise
 * app.onloz.com would match too. The app host is matched exactly.
 */
function matchesMarketing(hostname: string) {
  const host = hostname.toLowerCase()
  const www = MARKETING_HOST.startsWith("www.") ? MARKETING_HOST : `www.${MARKETING_HOST}`
  return host === MARKETING_HOST || host === www
}

export function proxy(request: NextRequest) {
  const { pathname, search, protocol } = request.nextUrl
  const hostname = (request.headers.get("host") ?? "").toLowerCase().split(":")[0]

  const isAppHost = hostname === APP_HOST
  const isMarketingHost = matchesMarketing(hostname)

  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/")
  const isPortal = pathname === "/portal" || pathname.startsWith("/portal/")
  const isAppOnly = isAdmin || isPortal

  // The marketing host never serves the core application.
  if (isMarketingHost && isAppOnly) {
    return redirectTo(protocol, APP_HOST, pathname, search)
  }

  // The app host only serves the core application. Its root lands on the
  // portal sign-in; anything else is pushed back to the marketing site.
  if (isAppHost) {
    if (isAdmin) return adminGate(request)
    if (isPortal) return NextResponse.next()
    if (pathname === "/") {
      return redirectTo(protocol, APP_HOST, "/portal/login", "")
    }
    return redirectTo(protocol, MARKETING_HOST, pathname, search)
  }

  // Unknown host — full access, but /admin stays protected.
  if (isAdmin) return adminGate(request)

  return NextResponse.next()
}

function redirectTo(
  protocol: string,
  host: string,
  pathname: string,
  search: string
) {
  return NextResponse.redirect(
    new URL(`${protocol}//${host}${pathname}${search}`),
    308
  )
}

/**
 * Basic-auth gate for /admin*. Username is "admin"; password is ADMIN_TOKEN.
 * Returns the 401 response when unauthenticated, NextResponse.next() when not.
 */
function adminGate(request: NextRequest): NextResponse {
  const adminToken = process.env.ADMIN_TOKEN

  if (!adminToken) {
    // Not configured — refuse access rather than fall open.
    console.error("proxy: ADMIN_TOKEN is not set; blocking /admin")
    return unauthorized()
  }

  const auth = request.headers.get("authorization")
  const expected = "Basic " + btoa(`admin:${adminToken}`)

  if (auth === expected) {
    return NextResponse.next()
  }

  return unauthorized()
}

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="admin"',
    },
  })
}

// Run on every page-level request (skip API + static assets), so the
// host-aware routing applies everywhere and /admin stays gated.
export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
