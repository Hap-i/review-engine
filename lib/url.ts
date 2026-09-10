/**
 * Public origin used to build absolute review links and QR content.
 *
 * Always the apex / canonical public site (e.g. https://onloz.com), never the
 * app subdomain — the /r/... links and codes are handed to customers. This is
 * a NEXT_PUBLIC var, so it's inlined at build time; set it in the deployment.
 */
export function baseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (envUrl) {
    return envUrl.replace(/\/+$/, "")
  }

  // Safety net: a production build must never leak localhost into QRs/links,
  // so fall back to the canonical public origin when the var is missing.
  if (process.env.NODE_ENV === "production") {
    return "https://onloz.com"
  }
  return "http://localhost:3000"
}
