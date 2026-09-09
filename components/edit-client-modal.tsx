"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { RiCloseLine } from "@remixicon/react"
import { updateClient } from "@/app/admin/actions"
import { TagInput, tagsToFieldValue } from "@/components/tag-input"
import type {
  ClientFormAction,
  ClientFormState,
  OwnerProfile,
} from "@/lib/types"
import { cn } from "@/lib/utils"

type EditClientModalProps = {
  client: {
    id: string
    slug: string
    business_name: string
    business_description: string
    google_review_url: string
    owner_id?: string | null
  }
  /** Server action used to save (admin by default; portal passes its own). */
  action?: ClientFormAction
  /** When provided, renders the owner picker (admin-only). */
  owners?: OwnerProfile[]
  /** Current review tags, pre-filled so saving edits never wipes them. */
  tags?: string[]
  onClose: () => void
}

const initialState: ClientFormState = {}

const fieldClass =
  "w-full rounded-none border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"

export function EditClientModal({
  client,
  action = updateClient,
  owners,
  tags = [],
  onClose,
}: EditClientModalProps) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(action, initialState)
  const [tagList, setTagList] = useState<string[]>(tags)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  const success = Boolean(state.success)

  // Close on Escape, focus the first field on open, and refresh the list once saved.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    firstFieldRef.current?.focus()
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  useEffect(() => {
    if (success) {
      router.refresh()
      onClose()
    }
  }, [success, router, onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Edit ${client.business_name}`}
      onMouseDown={(e) => {
        // Close when the click lands on the backdrop, not the panel.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-md border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Edit client</h2>
            <p className="mt-0.5 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              /r/{client.slug}
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

        <form action={formAction} className="flex flex-col gap-3 p-5">
          <input type="hidden" name="id" value={client.id} />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="edit-businessName"
              className="text-xs tracking-widest text-muted-foreground uppercase"
            >
              Business name
            </label>
            <input
              ref={firstFieldRef}
              id="edit-businessName"
              name="businessName"
              required
              defaultValue={client.business_name}
              placeholder="e.g. Sunny Cafe"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="edit-businessDescription"
              className="text-xs tracking-widest text-muted-foreground uppercase"
            >
              Business description
            </label>
            <textarea
              id="edit-businessDescription"
              name="businessDescription"
              required
              rows={3}
              defaultValue={client.business_description}
              placeholder="A sentence or two about what the business offers — used to write the review."
              className={cn(fieldClass, "resize-none leading-relaxed")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="edit-googleReviewUrl"
              className="text-xs tracking-widest text-muted-foreground uppercase"
            >
              Google review link
            </label>
            <input
              id="edit-googleReviewUrl"
              name="googleReviewUrl"
              required
              type="url"
              defaultValue={client.google_review_url}
              placeholder="https://g.page/r/…/review"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Review tags <span className="normal-case">(optional)</span>
            </span>
            <input
              type="hidden"
              name="tags"
              value={tagsToFieldValue(tagList)}
            />
            <TagInput
              value={tagList}
              onChange={setTagList}
              hint="Customers are shown a few of these and pick which stood out or needed work."
            />
          </div>

          {owners && (
            <div className="flex flex-col gap-1">
              <label
                htmlFor="edit-ownerId"
                className="text-xs tracking-widest text-muted-foreground uppercase"
              >
                Owner
              </label>
              <select
                id="edit-ownerId"
                name="ownerId"
                defaultValue={client.owner_id ?? ""}
                className={fieldClass}
              >
                <option value="">Unassigned</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name} — {owner.email}
                  </option>
                ))}
              </select>
            </div>
          )}

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            The public link and QR code keep their current slug — renaming a
            business won&apos;t break printed codes.
          </p>

          {state.error && (
            <p className="text-xs text-destructive">{state.error}</p>
          )}

          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center justify-center border border-border bg-background px-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase hover:bg-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className={cn(
                "inline-flex h-9 items-center justify-center border px-4 text-xs font-semibold tracking-widest uppercase transition-all",
                pending
                  ? "cursor-wait border-border bg-muted text-muted-foreground/50"
                  : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
              )}
            >
              {pending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
