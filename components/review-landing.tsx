"use client"

import { useState } from "react"
import {
  RiCheckboxCircleFill,
  RiStarFill,
  RiStarLine,
} from "@remixicon/react"
import { cn } from "@/lib/utils"

type ReviewLandingProps = {
  clientId: string
  businessName: string
  googleReviewUrl: string
  /** A random sample of the owner's tags for this business (max 5). */
  tags?: string[]
}

const STAR_LABELS = ["", "Terrible", "Poor", "Okay", "Good", "Excellent"]

export function ReviewLanding({
  clientId,
  businessName,
  googleReviewUrl,
  tags = [],
}: ReviewLandingProps) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [stage, setStage] = useState<"rate" | "select" | "draft">("rate")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [generating, setGenerating] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const active = hovered || rating
  const isPositive = rating >= 4

  function pickRating(next: number) {
    if (next === rating && stage === "select") return
    setRating(next)
    setHovered(0)
    setSelectedTags([])
    setNote("")
    setReviewText("")
    setError(null)
    setMessage(null)
    setStage("select")
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  function backToRate() {
    setStage("rate")
    setError(null)
    setMessage(null)
  }

  function backToSelect() {
    setStage("select")
    setReviewText("")
    setError(null)
    setMessage(null)
  }

  const canGenerate =
    stage === "select" &&
    !generating &&
    (tags.length === 0 || selectedTags.length > 0)

  const canSubmit =
    stage === "draft" && reviewText.trim().length > 0 && !busy

  async function handleGenerate() {
    if (!canGenerate) return
    setGenerating(true)
    setError(null)
    setMessage(null)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          rating,
          tags: selectedTags,
          note: note.trim() ? note.trim() : undefined,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(
          data?.error ?? "Something went wrong generating your review."
        )
      }
      setReviewText(data.review)
      setStage("draft")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.")
    } finally {
      setGenerating(false)
    }
  }

  async function handleSubmit() {
    const text = reviewText.trim()
    if (!text || rating < 1 || busy) return

    setBusy(true)
    setError(null)
    setMessage(null)

    try {
      // Persist the review first — the redirect below leaves this page.
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          rating,
          reviewText: text,
          tags: selectedTags,
        }),
      })
      if (!res.ok) {
        throw new Error("We couldn't save your review. Please try again.")
      }

      const copied = await copyToClipboard(text)
      setMessage(
        copied
          ? "Review copied! Opening Google…"
          : "Couldn’t auto-copy — please copy the review below, then continue."
      )

      // Give the "copied" confirmation a beat to render, then head to Google.
      setTimeout(
        () => {
          window.location.assign(googleReviewUrl)
        },
        copied ? 1200 : 4000
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.")
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border px-6 py-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{businessName}</h1>
      </header>

      <section className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-6 py-8">
        {stage === "rate" && (
          <div>
            <p className="mb-3 text-center text-xs tracking-widest text-muted-foreground uppercase">
              How was your experience?
            </p>
            <div
              className="flex justify-center gap-2"
              role="radiogroup"
              aria-label="Star rating"
              onMouseLeave={() => setHovered(0)}
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const filled = value <= active
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value === 1 ? "" : "s"} — ${STAR_LABELS[value]}`}
                    onClick={() => pickRating(value)}
                    onMouseEnter={() => setHovered(value)}
                    onFocus={() => setHovered(value)}
                    onBlur={() => setHovered(0)}
                    className="shrink-0 rounded-none p-1 transition-transform hover:scale-110 active:scale-95"
                  >
                    {filled ? (
                      <RiStarFill className="size-10 text-amber-400" />
                    ) : (
                      <RiStarLine className="size-10 text-muted-foreground/50" />
                    )}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 min-h-5 text-center text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {STAR_LABELS[rating] || "Tap a star to start"}
              </span>
            </p>
          </div>
        )}

        {stage === "select" && (
          <div className="flex flex-1 flex-col gap-6">
            <RatingBar rating={rating} onBack={backToRate} />

            <div>
              <h2 className="text-base font-semibold">
                {isPositive ? "What stood out well?" : "What could we improve?"}
              </h2>
              {tags.length > 0 && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {isPositive
                    ? "Select what you enjoyed — this will shape your review."
                    : "Select what let you down — this will shape your review."}
                </p>
              )}
            </div>

            {tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={isPositive ? "Highlights" : "Areas to improve"}
              >
                {tags.map((tag) => {
                  const selected = selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "inline-flex min-h-10 items-center gap-1.5 rounded-none border px-3 text-sm transition-all",
                        selected
                          ? "border-transparent bg-primary text-primary-foreground"
                          : "border-foreground/25 bg-card text-foreground hover:border-ring"
                      )}
                    >
                      {selected && (
                        <RiCheckboxCircleFill className="size-4" />
                      )}
                      {tag}
                    </button>
                  )
                })}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="note"
                className="text-xs tracking-widest text-muted-foreground uppercase"
              >
                Anything else? <span className="normal-case">(optional)</span>
              </label>
              <input
                id="note"
                type="text"
                value={note}
                maxLength={300}
                onChange={(e) => {
                  setNote(e.target.value)
                  setError(null)
                }}
                placeholder="A line in your own words, if you like."
                className="w-full rounded-none border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"
              />
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <div className="mt-auto">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center rounded-none border px-4 text-sm font-semibold tracking-widest uppercase transition-all",
                  canGenerate
                    ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                    : "cursor-not-allowed border-border bg-muted text-muted-foreground/50"
                )}
              >
                {generating
                  ? "Writing your review…"
                  : tags.length > 0 && selectedTags.length === 0
                    ? "Pick at least one to continue"
                    : "Write review"}
              </button>
            </div>
          </div>
        )}

        {stage === "draft" && (
          <div className="flex flex-1 flex-col gap-3">
            <RatingBar rating={rating} onBack={backToRate} />

            <label
              htmlFor="review"
              className="text-xs tracking-widest text-muted-foreground uppercase"
            >
              Your review
            </label>
            <textarea
              id="review"
              rows={7}
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value)
                setError(null)
              }}
              placeholder="Your review will appear here — feel free to edit it."
              className={cn(
                "w-full resize-none rounded-none border border-border bg-background p-3 text-sm leading-relaxed outline-none focus:border-ring focus:ring-1 focus:ring-ring/50",
                error &&
                  "border-destructive focus:border-destructive focus:ring-destructive/50"
              )}
            />

            <button
              type="button"
              onClick={backToSelect}
              className="self-start text-xs tracking-widest text-muted-foreground uppercase underline underline-offset-4 hover:text-foreground"
            >
              ← Change your choices
            </button>

            {error && <p className="text-xs text-destructive">{error}</p>}
            {message && <p className="text-xs text-foreground">{message}</p>}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "mt-auto inline-flex h-12 w-full items-center justify-center rounded-none border px-4 text-sm font-semibold tracking-widest uppercase transition-all",
                canSubmit
                  ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                  : "cursor-not-allowed border-border bg-muted text-muted-foreground/50"
              )}
            >
              {busy ? "Working…" : "Next"}
            </button>
          </div>
        )}
      </section>

      <footer className="px-6 pb-6 text-center text-[11px] tracking-widest text-muted-foreground/60 uppercase">
        Powered by {businessName}
      </footer>
    </main>
  )
}

/** Compact recap of the chosen rating with a link to change it. */
function RatingBar({ rating, onBack }: { rating: number; onBack: () => void }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((value) => (
          <RiStarFill
            key={value}
            className={
              value <= rating
                ? "size-5 text-amber-400"
                : "size-5 text-muted-foreground/25"
            }
          />
        ))}
      </span>
      <button
        type="button"
        onClick={onBack}
        className="text-xs tracking-widest text-muted-foreground uppercase underline underline-offset-4 hover:text-foreground"
      >
        Change
      </button>
    </div>
  )
}

/**
 * Copy text to the clipboard. Modern browsers use the async Clipboard API;
 * older iOS Safari falls back to a hidden textarea + execCommand.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the execCommand fallback
  }

  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, text.length)
    const ok = document.execCommand("copy")
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}
