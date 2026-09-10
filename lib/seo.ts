import type { Metadata } from "next"

import { baseUrl } from "@/lib/url"

/**
 * Builds the metadata every public marketing page needs: a title the
 * "%s | Onloz" template in app/layout.tsx suffixes, a description, a canonical
 * URL, and the Open Graph / Twitter tags that make a shared link render.
 *
 * Canonicals always resolve against baseUrl() — the apex marketing origin —
 * never the requesting host. proxy.ts answers on both onloz.com and
 * www.onloz.com and serves identical markup from each, so without a canonical
 * pointing at one of them Google sees two copies of every page.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  openGraph,
}: {
  /** Page name only — "About", not "About | Onloz". */
  title: string
  description: string
  /** Root-relative path this page is served at, e.g. "/about". */
  path: string
  /** Escape hatch for the homepage, whose title is the brand tagline. */
  absoluteTitle?: boolean
  /** Overrides for a social card that should differ from the SERP snippet. */
  openGraph?: { title?: string; description?: string }
}): Metadata {
  const canonical = `${baseUrl()}${path}`
  const ogTitle = openGraph?.title ?? title
  const ogDescription = openGraph?.description ?? description

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "Onloz",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
  }
}
