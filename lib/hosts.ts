/**
 * Hostnames for the split-origin deployment, shared by proxy.ts (routing) and
 * robots.ts (crawl rules) so the two can never drift apart.
 *
 * Marketing is the apex domain; the core application lives on its own
 * subdomain. Override with ONLOZ_APP_HOST / ONLOZ_MARKETING_HOST.
 */

export const APP_HOST = process.env.ONLOZ_APP_HOST ?? "app.onloz.com"

export const MARKETING_HOST = process.env.ONLOZ_MARKETING_HOST ?? "onloz.com"

/** Strip a port and normalise case, so "App.Onloz.com:3000" compares equal. */
export function normalizeHost(host: string | null): string {
  return (host ?? "").toLowerCase().split(":")[0]
}

/** True for the app subdomain — the only origin where the app is served. */
export function isAppHost(host: string | null): boolean {
  return normalizeHost(host) === APP_HOST
}
