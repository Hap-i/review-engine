"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import { loginUser, type LoginState } from "@/app/portal/actions"
import { cn } from "@/lib/utils"

const initialState: LoginState = {}

const fieldClass =
  "w-full rounded-none border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginUser, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // A failed attempt must keep the email but clear the password, so the owner
  // only retypes the password. The action echoes the submitted email back in
  // `state`; we re-assert it and wipe the password directly. Inputs stay
  // uncontrolled so browser password managers keep working.
  useEffect(() => {
    if (!state.error) return
    const form = formRef.current
    if (!form) return
    const emailEl = form.elements.namedItem("email") as HTMLInputElement | null
    const passwordEl = form.elements.namedItem(
      "password"
    ) as HTMLInputElement | null
    if (emailEl) emailEl.value = state.email ?? emailEl.value
    if (passwordEl) passwordEl.value = ""
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
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
          type="email"
          required
          autoComplete="email"
          placeholder="owner@business.com"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Your password"
            className={cn(fieldClass, "pr-10")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            onMouseDown={(event) => event.preventDefault()}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex items-center justify-center border-l border-border px-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <RiEyeOffLine className="size-4" aria-hidden="true" />
            ) : (
              <RiEyeLine className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {state.error && <p className="text-xs text-destructive">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "mt-1 inline-flex h-11 items-center justify-center rounded-none border px-4 text-xs font-semibold tracking-widest uppercase transition-all",
          pending
            ? "cursor-wait border-border bg-muted text-muted-foreground/50"
            : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
        )}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
