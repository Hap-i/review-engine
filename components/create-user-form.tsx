"use client"

import { useActionState, useEffect, useRef } from "react"
import { createUser } from "@/app/admin/actions"
import type { CreateUserState } from "@/app/admin/actions"
import { cn } from "@/lib/utils"

const initialState: CreateUserState = {}

const fieldClass =
  "w-full rounded-none border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUser, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const success = Boolean(state.success)

  useEffect(() => {
    if (success) {
      formRef.current?.reset()
    }
  }, [success])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="e.g. Priya Sharma"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            placeholder="owner@business.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            One-time password
          </label>
          <input
            id="password"
            name="password"
            required
            type="text"
            autoComplete="new-password"
            placeholder="Share this once with the owner"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="maxClients"
            className="text-xs tracking-widest text-muted-foreground uppercase"
          >
            Client quota
          </label>
          <input
            id="maxClients"
            name="maxClients"
            required
            type="number"
            min={0}
            defaultValue="10"
            className={fieldClass}
          />
        </div>
      </div>

      {state.error && <p className="text-xs text-destructive">{state.error}</p>}
      {success && !pending && (
        <p className="text-xs text-foreground">
          User created — share the password you set once. They log in at
          /portal.
        </p>
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
        {pending ? "Creating…" : "Create user"}
      </button>
    </form>
  )
}
