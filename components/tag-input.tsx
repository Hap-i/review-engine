"use client"

import { useState } from "react"
import { RiAddLine, RiCloseLine } from "@remixicon/react"
import { cn } from "@/lib/utils"

type TagInputProps = {
  value: string[]
  onChange: (tags: string[]) => void
  disabled?: boolean
  placeholder?: string
  /** Text under the chips (explains how tags are used). */
  hint?: string
}

/** Cap a single label like the server does. */
export const MAX_TAG_LENGTH = 40

/**
 * Controlled chip editor for entering a business's review tags. Used inside the
 * onboard/edit forms and the standalone tag manager so the UX is identical.
 */
export function TagInput({
  value,
  onChange,
  disabled,
  placeholder = "Add a tag, e.g. Ambiance",
  hint,
}: TagInputProps) {
  const [draft, setDraft] = useState("")

  function addTag() {
    const label = draft.trim().slice(0, MAX_TAG_LENGTH)
    if (!label || disabled) {
      setDraft("")
      return
    }
    const exists = value.some((t) => t.toLowerCase() === label.toLowerCase())
    if (!exists) {
      onChange([...value, label])
    }
    setDraft("")
  }

  function removeTag(label: string) {
    onChange(value.filter((t) => t !== label))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {value.length === 0 ? (
          <span className="text-xs text-muted-foreground">No tags yet.</span>
        ) : (
          value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 border border-foreground/25 bg-muted py-1 pr-1 pl-2.5 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                disabled={disabled}
                className="inline-flex size-5 items-center justify-center rounded-none text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
              >
                <RiCloseLine className="size-3.5" />
              </button>
            </span>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          maxLength={MAX_TAG_LENGTH}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addTag()
            }
            if (e.key === "Backspace" && draft === "" && value.length > 0) {
              // Backspace on an empty input removes the last chip.
              onChange(value.slice(0, -1))
            }
          }}
          placeholder={placeholder}
          className={cn(
            "h-10 w-full rounded-none border border-border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50",
            disabled && "opacity-60"
          )}
        />
        <button
          type="button"
          onClick={addTag}
          aria-label="Add tag"
          disabled={disabled}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-none border border-border bg-background px-3 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
        >
          <RiAddLine className="size-4" />
        </button>
      </div>

      {hint && <p className="text-[11px] leading-relaxed text-muted-foreground">{hint}</p>}
    </div>
  )
}

/** Join tags into the value stored in a hidden form field. */
export function tagsToFieldValue(tags: string[]): string {
  return JSON.stringify(tags)
}
