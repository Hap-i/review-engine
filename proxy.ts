import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Gate every /admin* route behind HTTP Basic Auth.
 * Username is fixed as "admin"; the password is the ADMIN_TOKEN env var.
 */
export function proxy(request: NextRequest) {
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

export const config = {
  matcher: "/admin/:path*",
}
