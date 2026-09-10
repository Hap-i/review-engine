/**
 * X/Twitter falls back to og:image when this is absent, but declaring it makes
 * the summary_large_image card explicit rather than relying on that fallback.
 */
export { alt, size, contentType, default } from "./opengraph-image"
