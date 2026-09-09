// Pure helpers for reporting how often each tag is praised vs criticized.

export type TagInsight = {
  tag: string
  praised: number
  criticized: number
}

export type TaggedReview = {
  rating: number
  tags?: string[] | null
}

/** Praised = the customer rated 4-5 stars (the "what stood out" band). */
export function isPraised(rating: number): boolean {
  return rating >= 4
}

/**
 * Tally tags across reviews. Every tag a customer picked counts once toward
 * praised (4-5 star reviews) or criticized (1-3 star reviews). Sorted by total
 * mentions descending, then alphabetically.
 */
export function computeTagInsight(reviews: TaggedReview[]): TagInsight[] {
  const byTag = new Map<string, TagInsight>()

  for (const review of reviews) {
    if (!review.tags || review.tags.length === 0) continue
    const bucket = isPraised(review.rating) ? "praised" : "criticized"
    for (const tag of review.tags) {
      const entry = byTag.get(tag) ?? { tag, praised: 0, criticized: 0 }
      entry[bucket] += 1
      byTag.set(tag, entry)
    }
  }

  return [...byTag.values()].sort((a, b) => {
    const total = b.praised + b.criticized - (a.praised + a.criticized)
    if (total !== 0) return total
    return a.tag.localeCompare(b.tag)
  })
}
