"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { createClient } from "@/app/admin/actions"
import { TagInput, tagsToFieldValue } from "@/components/tag-input"
import type {
  ClientFormAction,
  ClientFormState,
  OwnerProfile,
} from "@/lib/types"
import { cn } from "@/lib/utils"

type AddClientFormProps = {
  /** Server action used to create the client (admin by default; portal passes its own). */
  action?: ClientFormAction
  /** When provided, renders an owner picker (admin-only). */
  owners?: OwnerProfile[]
  successMessage?: string
  submitLabel?: string
}

const initialState: ClientFormState = {}

const fieldClass =
  "w-full rounded-none border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"

export function AddClientForm({
  action = createClient,
  owners,
  successMessage = "Client added — open the Clients tab to copy its link or download its QR code.",
  submitLabel = "Add client",
}: AddClientFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState)
  const [tags, setTags] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const success = Boolean(state.success)

  // After a successful submit, clear the form. We reset the DOM (not React state),
  // so uncontrolled inputs snap back to their empty defaults.
  useEffect(() => {
    if (success) {
      formRef.current?.reset()
      setTags([])
    }
  }, [success])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="businessName"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          Business name
        </label>
        <input
          id="businessName"
          name="businessName"
          defaultValue=""
          required
          placeholder="e.g. Sunny Cafe"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="businessDescription"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          Business description
        </label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          defaultValue=""
          required
          rows={3}
          placeholder="A sentence or two about what the business offers — used to write the review."
          className={cn(fieldClass, "resize-none leading-relaxed")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="googleReviewUrl"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          Google review link
        </label>
        <input
          id="googleReviewUrl"
          name="googleReviewUrl"
          defaultValue=""
          required
          type="url"
          placeholder="https://g.page/r/…/review"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs tracking-widest text-muted-foreground uppercase">
          Review tags <span className="normal-case">(optional)</span>
        </span>
        <input type="hidden" name="tags" value={tagsToFieldValue(tags)} />
        <TagInput
          value={tags}
          onChange={setTags}
          hint="Customers are shown a few of these and pick which stood out or needed work — e.g. Food, Service, Ambiance."
        />
      </div>

      {owners && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="ownerId"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Owner
          </label>
          <select
            id="ownerId"
            name="ownerId"
            defaultValue=""
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

      {state.error && <p className="text-xs text-destructive">{state.error}</p>}
      {success && !pending && (
        <p className="text-xs text-foreground">{successMessage}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-none border px-4 text-xs font-semibold tracking-widest uppercase transition-all",
          pending
            ? "cursor-wait border-border bg-muted text-muted-foreground/50"
            : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
        )}
      >
        {pending ? "Adding…" : submitLabel}
      </button>
    </form>
  )
}
