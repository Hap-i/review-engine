import { cn } from "@/lib/utils"
import {
  PRODUCT_HUNT_BADGE_ALT,
  PRODUCT_HUNT_POST_ID,
  PRODUCT_HUNT_URL,
} from "@/lib/site"

/* Shared building blocks for the Onloz marketing page. */

/**
 * Official Product Hunt "featured" badge, linking through to the launch post.
 *
 * A bare <img> pair rather than next/image: the widget is a third-party SVG on
 * api.producthunt.com, and next/image would need both a remotePatterns entry
 * and `dangerouslyAllowSVG` — which turns on script execution for any remote
 * SVG this app ever points at. A 250×54 vector has nothing to optimise, so the
 * optimizer buys nothing here.
 *
 * Light and dark are two stacked images swapped by the `dark:` variant rather
 * than a <picture> element: next-themes lets a visitor override their system
 * preference (theme-provider.tsx), so a prefers-color-scheme media query would
 * show the wrong badge whenever the in-page toggle disagrees with the OS. The
 * hidden twin is aria-hidden so the link is still announced exactly once.
 */
export function ProductHuntBadge({ className }: { className?: string }) {
  const src = (theme: "light" | "dark") =>
    `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${PRODUCT_HUNT_POST_ID}&theme=${theme}`

  return (
    <a
      href={PRODUCT_HUNT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- third-party SVG widget, see note above */}
      <img
        src={src("light")}
        alt={PRODUCT_HUNT_BADGE_ALT}
        width={250}
        height={54}
        loading="lazy"
        className="dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- dark twin of the badge above */}
      <img
        src={src("dark")}
        alt=""
        aria-hidden
        width={250}
        height={54}
        loading="lazy"
        className="hidden dark:block"
      />
    </a>
  )
}
