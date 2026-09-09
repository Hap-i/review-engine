"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { RiAddLine, RiCloseLine } from "@remixicon/react"
import type { TagSaveAction } from "@/lib/types"
import { cn } from "@/lib/utils"

type TagEditorProps = {
  clientId: string
  clientName: string
  initialTags: string[]
  /** Owner-scoped server action that persists the full ordered tag list. */
  saveAction: TagSaveAction
  onClose: () => void
}

export function TagEditor({
  clientId,
  clientName,
  initialTags,
  saveAction,
  onClose,
}: TagEditorProps) {
  const router = useRouter()
  const [tags, setTags] = useState<string[]>(initialTags)
  const [draft, setDraft] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    inputRef.current?.focus()
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  function addTag() {
    const label = draft.trim().slice(0, 40)
    if (!label) return
    const exists = tags.some((t) => t.toLowerCase() === label.toLowerCase())
    if (exists) {
      setDraft("")
      inputRef.current?.focus()
      return
    }
    setTags((prev) => [...prev, label])
    setDraft("")
    setError(null)
    inputRef.current?.focus()
  }

  function removeTag(label: string) {
    setTags((prev) => prev.filter((t) => t !== label))
  }

  async function handleSave() {
    if (saving) return
    setSaving(true)
    setError(null)
    const result = await saveAction(clientId, tags)
    setSaving(false)

    if (result?.error) {
      setError(result.error)
      return
    }
    router.refresh()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Review tags for ${clientName}`}
      onMouseDown={(e) => {
        // Close when the click lands on the backdrop, not the panel.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-md border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Review tags</h2>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {clientName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-8 items-center justify-center rounded-none border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <RiCloseLine className="size-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Add the things reviewers can comment on (e.g. Food, Service,
            Ambiance). Each customer sees 5 random tags and picks which stood
            out or needed work — the AI review is written from their choice.
          </p>

          <div className="flex flex-wrap gap-1.5">
            {tags.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No tags yet — add your first one below.
              </p>
            ) : (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 border border-foreground/25 bg-muted py-1 pr-1 pl-2.5 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove ${tag}`}
                    className="inline-flex size-5 items-center justify-center rounded-none text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <RiCloseLine className="size-3.5" />
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={draft}
              maxLength={40}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
              placeholder="Add a tag, e.g. Ambiance"
              className="h-10 w-full rounded-none border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"
            />
            <button
              type="button"
              onClick={addTag}
              aria-label="Add tag"
              className="inline-flex h-10 shrink-0 items-center justify-center border border-border bg-background px-3 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <RiAddLine className="size-4" />
            </button>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center justify-center border border-border bg-background px-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase hover:bg-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className={cn(
                "inline-flex h-9 items-center justify-center border px-4 text-xs font-semibold tracking-widest uppercase transition-all",
                saving
                  ? "cursor-wait border-border bg-muted text-muted-foreground/50"
                  : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
              )}
            >
              {saving ? "Saving…" : "Save tags"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
