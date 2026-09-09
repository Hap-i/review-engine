import type { TagInsight } from "@/lib/tag-insight"

/**
 * Praise/critique tallies per tag. Pure presentational — used in the expanded
 * client row (portal + admin) and the owner dashboard.
 */
export function TagInsightList({ items }: { items: TagInsight[] }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs tracking-widest text-muted-foreground uppercase">
          Tag insight
        </h3>
        <span className="flex items-center gap-3 text-[10px] tracking-wider text-muted-foreground uppercase">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 bg-emerald-500" />
            Praised
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 bg-rose-500" />
            To improve
          </span>
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-2 text-xs text-muted-foreground">
          No tag feedback yet. As customers pick tags, praise and improvement
          counts appear here.
        </p>
      ) : (
        <ul className="mt-2 flex flex-col divide-y divide-border border border-border bg-background">
          {items.map(({ tag, praised, criticized }) => (
            <li
              key={tag}
              className="flex items-center justify-between gap-4 px-3 py-2 text-sm"
            >
              <span className="min-w-0 truncate font-medium">{tag}</span>
              <span className="flex shrink-0 items-center gap-3 text-xs tabular-nums">
                <span className="text-emerald-600">{praised} praised</span>
                <span
                  className={
                    criticized > 0
                      ? "text-rose-600"
                      : "text-muted-foreground/50"
                  }
                >
                  {criticized} to improve
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
