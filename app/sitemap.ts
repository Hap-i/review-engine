import type { MetadataRoute } from "next"

import { baseUrl } from "@/lib/url"

type Priority = MetadataRoute.Sitemap[number]["priority"]
type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"]

/**
 * Every public marketing page, in the order the footer presents them.
 *
 * Deliberately absent: /portal and /admin (the core app — on its own origin,
 * behind auth, and disallowed in robots.ts), /api, and the per-client review
 * landings at /r/[slug] (handed out by QR code, not search results).
 */
const PAGES: {
  path: string
  priority: Priority
  changeFrequency: ChangeFrequency
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/roadmap", priority: 0.5, changeFrequency: "monthly" },
  { path: "/help", priority: 0.7, changeFrequency: "weekly" },
  { path: "/review-guide", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/review-ai-guidelines", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/acceptable-use", priority: 0.3, changeFrequency: "yearly" },
]

/**
 * Absolute URLs on the canonical marketing origin — /sitemap.xml is also
 * reachable on the app host, where relative entries would resolve wrongly.
 *
 * lastModified is omitted on purpose: these pages carry no per-page date, and
 * a build timestamp would claim all thirteen changed on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = baseUrl()

  return PAGES.map(({ path, priority, changeFrequency }) => ({
    // Next serialises the root canonical as the bare origin, with no trailing
    // slash. Match that here so a page's <loc> and its rel=canonical are always
    // byte-identical — the two disagreeing is a classic cause of Google
    // picking a different canonical than the one you declared.
    url: path === "/" ? origin : `${origin}${path}`,
    priority,
    changeFrequency,
  }))
}
