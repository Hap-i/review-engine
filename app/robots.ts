import type { MetadataRoute } from "next"
import { headers } from "next/headers"

import { isAppHost } from "@/lib/hosts"
import { baseUrl } from "@/lib/url"

/**
 * One deployment answers on two hosts (see proxy.ts), so the crawl rules have
 * to be host-aware — a single static file would invite Google into the app.
 *
 * Reading headers() opts this route out of static caching, which is what makes
 * the distinction below possible.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")

  // app.onloz.com serves only the login and admin surfaces — nothing worth
  // indexing, and its root 308s to /portal/login.
  if (isAppHost(host)) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    }
  }

  // Marketing host (and localhost / preview deploys) — index everything served
  // here. That includes the per-client review landings at /r/..., which live on
  // this origin and are meant to be found; the paths listed below are the app's,
  // reachable here only as 308s over to the app host.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/portal", // core app, sign-in included
        "/admin", // Basic-auth gated
        "/api/", // never useful to a crawler
      ],
    },
    sitemap: `${baseUrl()}/sitemap.xml`,
  }
}
