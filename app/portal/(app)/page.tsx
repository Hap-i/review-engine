import { RiStoreLine, RiStarFill } from "@remixicon/react"
import {
  getOwnerTagSummary,
  getOwnerTotals,
  listOwnerRecentReviews,
  requireOwner,
} from "@/lib/portal"
import { TagInsightList } from "@/components/tag-insight"
import { formatDate } from "@/lib/format"

const statCardClass = "flex flex-col gap-1 border border-border bg-card p-5"
const statLabelClass =
  "flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground"

export default async function PortalDashboardPage() {
  const owner = await requireOwner()
  const [totals, tagInsight, recentReviews] = await Promise.all([
    getOwnerTotals(owner.id),
    getOwnerTagSummary(owner.id),
    listOwnerRecentReviews(owner.id, 10),
  ])

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          An overview of {owner.name}&apos;s clients and reviews.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={statCardClass}>
          <p className={statLabelClass}>
            <RiStoreLine className="size-3.5" />
            Clients
          </p>
          <p className="text-3xl font-bold tabular-nums">
            {totals.clients}
            <span className="text-base font-medium text-muted-foreground">
              {" "}
              / {owner.max_clients}
            </span>
          </p>
        </div>
        <div className={statCardClass}>
          <p className={statLabelClass}>
            <RiStarFill className="size-3.5 text-amber-400" />
            Reviews
          </p>
          <p className="text-3xl font-bold tabular-nums">{totals.reviews}</p>
        </div>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <TagInsightList items={tagInsight} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Recent reviews
          </h2>
          {recentReviews.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No reviews yet. Share your client&apos;s QR code to start
              collecting them.
            </p>
          ) : (
            <ol className="flex flex-col divide-y divide-border border border-border bg-card">
              {recentReviews.map((review) => (
                <li key={review.id} className="px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex gap-0.5"
                        aria-label={`${review.rating} stars`}
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <RiStarFill
                            key={value}
                            className={
                              value <= review.rating
                                ? "size-4 text-amber-400"
                                : "size-4 text-muted-foreground/30"
                            }
                          />
                        ))}
                      </span>
                      <span className="text-sm leading-tight font-medium">
                        {review.clients?.business_name ?? "Unknown client"}
                      </span>
                    </div>
                    <time className="text-xs whitespace-nowrap text-muted-foreground">
                      {formatDate(review.created_at)}
                    </time>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
                    {review.review_text}
                  </p>
                  {review.tags && review.tags.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {review.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-foreground/25 bg-muted px-1.5 py-0.5 text-[10px] tracking-wide text-muted-foreground uppercase"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  )
}
